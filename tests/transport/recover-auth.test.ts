/**
 * `recoverAuth` seam (ADR 0008 / #107): opt-in silent re-authentication.
 *
 * On a 401 for an authenticated request the transport calls `recoverAuth`
 * before clearing the token; on success it replays the request once with the
 * freshly seated token. Concurrent 401s and `transport.recover()` share ONE
 * in-flight recovery (rotation reuse-defense). With no `recoverAuth`, the
 * fail-closed policy (see auth-hooks.test.ts) is unchanged.
 */
import { describe, expect, it, vi } from 'vitest';
import { createNene2Transport, createSessionTokenStore } from '../../src/index.js';
import type { SessionTokenStore } from '../../src/index.js';
import { createFakeStorage, jsonResponse, problemResponse } from './helpers.js';

function unauthorized(): Response {
  return problemResponse(401, {
    type: 'https://nene2.dev/problems/unauthorized',
    title: 'Unauthorized',
    status: 401,
  });
}

function authHeader(init: RequestInit | undefined): string | null {
  return new Headers(init?.headers ?? {}).get('Authorization');
}

/**
 * Fetch stub whose answer depends on the bearer token: any request carrying
 * `Bearer ${validToken}` gets 200; everything else (the expired token, or none)
 * gets 401. Order-independent, so it is safe under concurrency.
 */
function tokenAwareFetch(validToken: string): { fetch: typeof fetch; count: () => number } {
  const mock = vi.fn((...args: Parameters<typeof fetch>): Promise<Response> => {
    return Promise.resolve(
      authHeader(args[1]) === `Bearer ${validToken}` ? jsonResponse({ ok: true }) : unauthorized(),
    );
  });
  return { fetch: mock, count: () => mock.mock.calls.length };
}

/** Always 401 regardless of token (models a still-failing endpoint after refresh). */
function always401(): { fetch: typeof fetch; count: () => number } {
  const mock = vi.fn((): Promise<Response> => Promise.resolve(unauthorized()));
  return { fetch: mock, count: () => mock.mock.calls.length };
}

function store(initial: string | null): SessionTokenStore {
  const s = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
  if (initial !== null) s.setToken(initial);
  return s;
}

/** A `recoverAuth` that seats `newToken` and reports success, counting calls. */
function seatingRecover(tokenStore: SessionTokenStore, newToken: string) {
  const spy = vi.fn(async (): Promise<boolean> => {
    await Promise.resolve(); // ensure recovery is genuinely async (single-flight window)
    tokenStore.setToken(newToken);
    return true;
  });
  return spy;
}

describe('recoverAuth: replay on success', () => {
  it('recovers on 401, seats the new token, and replays the request once', async () => {
    const s = store('expired');
    const recoverAuth = seatingRecover(s, 'fresh');
    const net = tokenAwareFetch('fresh');
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    await expect(transport.get('/items')).resolves.toEqual({ ok: true });

    expect(recoverAuth).toHaveBeenCalledTimes(1);
    expect(net.count()).toBe(2); // original 401 + replay 200
    expect(s.getToken()).toBe('fresh');
  });

  it('replays blob and raw-bytes paths too (recovery lives in the send() choke point)', async () => {
    for (const run of [
      (t: ReturnType<typeof createNene2Transport>) => t.getBlob('/export'),
      (t: ReturnType<typeof createNene2Transport>) => t.postBytes('/import', new Blob(['x'])),
    ]) {
      const s = store('expired');
      const recoverAuth = seatingRecover(s, 'fresh');
      const net = tokenAwareFetch('fresh');
      const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

      await expect(run(transport)).resolves.toBeDefined();
      expect(recoverAuth).toHaveBeenCalledTimes(1);
      expect(net.count()).toBe(2);
    }
  });
});

describe('recoverAuth: fail closed', () => {
  it('clears the token and fires onUnauthorized when recovery returns false (no replay)', async () => {
    const s = store('expired');
    const recoverAuth = vi.fn((): Promise<boolean> => Promise.resolve(false));
    const onUnauthorized = vi.fn();
    const net = always401();
    const transport = createNene2Transport({
      tokenStore: s,
      fetch: net.fetch,
      recoverAuth,
      onUnauthorized,
    });

    await expect(transport.get('/items')).rejects.toMatchObject({ status: 401 });

    expect(recoverAuth).toHaveBeenCalledTimes(1);
    expect(net.count()).toBe(1); // no replay
    expect(s.getToken()).toBeNull();
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it('treats a throwing recoverAuth as a failed recovery (fail closed, no leak)', async () => {
    const s = store('expired');
    const recoverAuth = vi.fn(
      (): Promise<boolean> => Promise.reject(new Error('refresh network error')),
    );
    const net = always401();
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    await expect(transport.get('/items')).rejects.toMatchObject({ status: 401 });
    expect(s.getToken()).toBeNull();
  });

  it('does not recurse: a replay that 401s again falls through (recoverAuth called once)', async () => {
    const s = store('expired');
    // Recovery "succeeds" (seats a token) but the endpoint keeps 401ing.
    const recoverAuth = seatingRecover(s, 'fresh');
    const net = always401();
    const onUnauthorized = vi.fn();
    const transport = createNene2Transport({
      tokenStore: s,
      fetch: net.fetch,
      recoverAuth,
      onUnauthorized,
    });

    await expect(transport.get('/items')).rejects.toMatchObject({ status: 401 });

    expect(recoverAuth).toHaveBeenCalledTimes(1); // NOT called again on the replay
    expect(net.count()).toBe(2); // original + one replay, then stop
    expect(onUnauthorized).toHaveBeenCalledOnce();
    expect(s.getToken()).toBeNull();
  });

  it('does not attempt recovery on a credentials 401 (no token attached)', async () => {
    const s = store(null);
    const recoverAuth = vi.fn((): Promise<boolean> => Promise.resolve(true));
    const net = always401();
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    await expect(transport.post('/auth/login', { email: 'a' })).rejects.toMatchObject({
      status: 401,
    });
    expect(recoverAuth).not.toHaveBeenCalled();
  });
});

describe('recoverAuth: shared single-flight (rotation reuse-defense)', () => {
  it('collapses concurrent 401s into ONE recovery', async () => {
    const s = store('expired');
    const recoverAuth = seatingRecover(s, 'fresh');
    const net = tokenAwareFetch('fresh');
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    const results = await Promise.all([
      transport.get('/a'),
      transport.get('/b'),
      transport.get('/c'),
      transport.get('/d'),
    ]);

    expect(results).toEqual([{ ok: true }, { ok: true }, { ok: true }, { ok: true }]);
    expect(recoverAuth).toHaveBeenCalledTimes(1); // one refresh for all four 401s
  });

  it('shares the in-flight recovery between an app-start probe and a 401-retry', async () => {
    const s = store('expired');
    const recoverAuth = seatingRecover(s, 'fresh');
    const net = tokenAwareFetch('fresh');
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    const [probed, item] = await Promise.all([transport.recover(), transport.get('/items')]);

    expect(probed).toBe(true);
    expect(item).toEqual({ ok: true });
    expect(recoverAuth).toHaveBeenCalledTimes(1);
  });

  it('allows a fresh recovery after the previous one settled', async () => {
    const s = store('expired');
    const recoverAuth = seatingRecover(s, 'fresh');
    const net = tokenAwareFetch('fresh');
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, recoverAuth });

    expect(await transport.recover()).toBe(true);
    s.setToken('expired'); // simulate a later expiry
    expect(await transport.recover()).toBe(true);
    expect(recoverAuth).toHaveBeenCalledTimes(2); // sequential calls are not de-duped
  });
});

describe('recoverAuth: unconfigured (default)', () => {
  it('recover() resolves false and no recovery is attempted on 401', async () => {
    const s = store('expired');
    const net = always401();
    const onUnauthorized = vi.fn();
    const transport = createNene2Transport({ tokenStore: s, fetch: net.fetch, onUnauthorized });

    expect(await transport.recover()).toBe(false);
    await expect(transport.get('/items')).rejects.toMatchObject({ status: 401 });
    expect(net.count()).toBe(1); // fail closed, no replay
    expect(s.getToken()).toBeNull();
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });
});
