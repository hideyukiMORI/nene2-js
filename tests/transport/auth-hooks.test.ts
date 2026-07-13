/**
 * Invariants 2/5 (#102): a 401 on an authenticated request clears the token
 * store and fires the app-injected hook (side effects like redirects stay in
 * the app); a credentials-401 (no token attached, e.g. login) does neither;
 * 403 notifies without signing the user out unless the app opts in.
 */
import { describe, expect, it, vi } from 'vitest';
import { createNene2Transport, createSessionTokenStore } from '../../src/index.js';
import type { AuthFailureContext } from '../../src/index.js';
import { createFakeStorage, jsonResponse, problemResponse, recordingFetch } from './helpers.js';

function unauthorizedProblem(): Response {
  return problemResponse(401, {
    type: 'https://nene2.dev/problems/unauthorized',
    title: 'Unauthorized',
    status: 401,
  });
}

describe('401 handling', () => {
  it('clears the token store and calls onUnauthorized when a token was attached', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken('expired-jwt');
    const contexts: AuthFailureContext[] = [];
    const transport = createNene2Transport({
      tokenStore: store,
      fetch: recordingFetch(unauthorizedProblem()).fetch,
      onUnauthorized: (context) => {
        contexts.push(context);
      },
    });

    await expect(transport.get('/items')).rejects.toMatchObject({
      name: 'Nene2ClientError',
      status: 401,
    });

    expect(store.getToken()).toBeNull();
    expect(contexts).toHaveLength(1);
    expect(contexts[0]).toMatchObject({
      status: 401,
      path: '/items',
      tokenAttached: true,
    });
    expect(contexts[0]?.problem?.title).toBe('Unauthorized');
  });

  it('does NOT clear or notify on a credentials 401 (no token attached — login form case)', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    const onUnauthorized = vi.fn();
    const transport = createNene2Transport({
      tokenStore: store,
      fetch: recordingFetch(unauthorizedProblem()).fetch,
      onUnauthorized,
    });

    await expect(
      transport.post('/auth/login', { email: 'a', password: 'wrong' }),
    ).rejects.toMatchObject({ status: 401 });

    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it('clears the token on 401 for blob and upload paths too', async () => {
    for (const run of [
      (t: ReturnType<typeof createNene2Transport>) => t.getBlob('/export'),
      (t: ReturnType<typeof createNene2Transport>) => t.upload('/upload', new FormData()),
    ]) {
      const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
      store.setToken('expired-jwt');
      const transport = createNene2Transport({
        tokenStore: store,
        fetch: recordingFetch(unauthorizedProblem()).fetch,
      });

      await expect(run(transport)).rejects.toMatchObject({ status: 401 });
      expect(store.getToken()).toBeNull();
    }
  });
});

describe('403 handling', () => {
  it('calls onForbidden and keeps the token by default (still authenticated)', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken('valid-jwt');
    const onForbidden = vi.fn();
    const transport = createNene2Transport({
      tokenStore: store,
      fetch: recordingFetch(
        problemResponse(403, { type: 'about:blank', title: 'Forbidden', status: 403 }),
      ).fetch,
      onForbidden,
    });

    await expect(transport.get('/admin')).rejects.toMatchObject({ status: 403 });

    expect(onForbidden).toHaveBeenCalledOnce();
    expect(store.getToken()).toBe('valid-jwt');
  });

  it('clears the token on 403 when the app opts in via clearTokenOnStatuses', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken('valid-jwt');
    const transport = createNene2Transport({
      tokenStore: store,
      clearTokenOnStatuses: [401, 403],
      fetch: recordingFetch(
        problemResponse(403, { type: 'about:blank', title: 'Forbidden', status: 403 }),
      ).fetch,
    });

    await expect(transport.get('/admin')).rejects.toMatchObject({ status: 403 });
    expect(store.getToken()).toBeNull();
  });
});

describe('success path', () => {
  it('leaves the token store untouched on 2xx', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken('valid-jwt');
    const transport = createNene2Transport({
      tokenStore: store,
      fetch: recordingFetch(jsonResponse({ ok: true })).fetch,
    });

    await transport.get('/items');
    expect(store.getToken()).toBe('valid-jwt');
  });
});
