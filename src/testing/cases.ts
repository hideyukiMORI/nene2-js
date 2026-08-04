/**
 * The transport contract — 5 groups, 12 required cases (issue #123).
 *
 * Selected from the package's 44 internal unit tests by one rule (fleet #232):
 *
 * > Can this break because of a value the **product** supplies — client config,
 * > token store, `onUnauthorized`, `recoverAuth`, per-request headers?
 *
 * Checks of the package's own internals (JSON parsing, baseUrl normalisation)
 * are deliberately **not** shipped: no product wiring can break them, so they
 * would be green on every ship forever — a test that cannot fail is a test that
 * measures nothing.
 *
 * Every case is a plain async function that throws {@link TransportContractError}.
 * `runTransportContract` registers them as `it()`s (layer L-b); products that
 * need finer control can call the L-a helpers in `assertions.ts` directly.
 */
import { createNene2Transport, type Nene2Transport } from '../transport/transport.js';
import type { TokenStore } from '../transport/token-store.js';
import type {
  ContractCaseId,
  ContractGroup,
  ContractWiring,
  TransportContractDeps,
} from './deps.js';
import { assertContract, TransportContractError } from './errors.js';
import {
  contractJsonResponse,
  contractProblemResponse,
  createHostileStorage,
  createRecordingFetch,
  findStoredValue,
  instrumentConfig,
  type ContractFetchRecorder,
  type ContractResponder,
  type InstrumentedConfig,
} from './harness.js';

const TOKEN = 'contract-token-alpha';
const ROTATED_TOKEN = 'contract-token-beta';
const REFRESHED_TOKEN = 'contract-token-refreshed';

/** One contract case. `run` throws on violation and returns normally on pass. */
export interface ContractCase {
  readonly id: ContractCaseId;
  readonly group: ContractGroup;
  /** Human-readable `it()` title. */
  readonly title: string;
  /** Required cases make up the 12; optional ones run only when requested. */
  readonly required: boolean;
  run(deps: TransportContractDeps): Promise<void>;
}

interface DriveOptions {
  /** Storage handed to the product's token store, when the case needs one. */
  readonly storage?: Storage | undefined;
  /** Replaces the product's `recoverAuth` so a case can force an outcome. */
  readonly recoverAuth?: ((wiring: ContractWiring) => Promise<boolean>) | undefined;
}

interface Driven {
  readonly wiring: ContractWiring;
  readonly transport: Nene2Transport;
  readonly recorder: ContractFetchRecorder;
  readonly instrumented: InstrumentedConfig;
}

/** Build one product transport wired to a recording `fetch`. */
function drive(
  deps: TransportContractDeps,
  responder: ContractResponder,
  options: DriveOptions = {},
): Driven {
  const wiring = deps.createWiring(
    options.storage === undefined ? {} : { storage: options.storage },
  );
  const recorder = createRecordingFetch(responder);
  const recoverAuth = options.recoverAuth;
  const instrumented = instrumentConfig(wiring.config, recorder.fetch, {
    recoverAuth:
      recoverAuth === undefined ? undefined : (): Promise<boolean> => recoverAuth(wiring),
  });
  const build = wiring.createTransport ?? createNene2Transport;
  return { wiring, transport: build(instrumented.config), recorder, instrumented };
}

function requireStore(wiring: ContractWiring, caseId: ContractCaseId): TokenStore {
  const store = wiring.config.tokenStore;
  if (store === undefined) {
    throw new TransportContractError(
      'the transport config has no `tokenStore` — an authenticated product must supply one ' +
        '(createSessionTokenStore, or its own store adapted to the TokenStore interface)',
      caseId,
    );
  }
  return store;
}

async function expectRejection(
  promise: Promise<unknown>,
  caseId: ContractCaseId,
  what: string,
): Promise<void> {
  let rejected = false;
  try {
    await promise;
  } catch {
    rejected = true;
  }
  assertContract(rejected, `${what}: the transport resolved instead of rejecting`, caseId);
}

/**
 * Wrap a synchronous case body. Every case exposes the same promise-returning
 * signature, so a violation is always a rejection — a case that threw
 * synchronously would escape a caller that only handles rejections.
 */
function sync(
  body: (deps: TransportContractDeps) => void,
): (deps: TransportContractDeps) => Promise<void> {
  return (deps) =>
    Promise.resolve().then(() => {
      body(deps);
    });
}

/** Every transport path, so C1-1 and C5-13 cover the whole surface. */
const ALL_PATHS: ReadonlyArray<readonly [string, (transport: Nene2Transport) => Promise<unknown>]> =
  [
    ['get', (t) => t.get('/contract/get?q=1')],
    ['post', (t) => t.post('/contract/post', { probe: true })],
    ['put', (t) => t.put('/contract/put', { probe: true })],
    ['patch', (t) => t.patch('/contract/patch', { probe: true })],
    ['delete', (t) => t.delete('/contract/delete')],
    ['getBlob', (t) => t.getBlob('/contract/blob')],
    ['postBlob', (t) => t.postBlob('/contract/blob', { probe: true })],
    ['upload', (t) => t.upload('/contract/upload', new FormData())],
    ['postCsv', (t) => t.postCsv('/contract/csv', 'a,b\n1,2')],
    ['postBytes', (t) => t.postBytes('/contract/bytes', new Blob(['x']))],
  ];

const okResponder: ContractResponder = () => contractJsonResponse();

export const CONTRACT_CASES: readonly ContractCase[] = [
  // ── C1 · the X-Authorization mirror ────────────────────────────────────────
  {
    id: 'C1-1',
    group: 'C1',
    required: true,
    title: 'C1-1 every transport path sends Authorization and the X-Authorization mirror',
    async run(deps) {
      const { wiring, transport, recorder } = drive(deps, okResponder);
      wiring.seedToken(TOKEN);
      for (const [name, call] of ALL_PATHS) {
        await call(transport);
        const recorded = recorder.calls[recorder.calls.length - 1];
        assertContract(recorded !== undefined, `${name}() made no request`, 'C1-1');
        assertContract(
          recorded.headers.get('Authorization') === `Bearer ${TOKEN}`,
          `${name}() did not send the bearer on Authorization`,
          'C1-1',
        );
        assertContract(
          recorded.headers.get('X-Authorization') === `Bearer ${TOKEN}`,
          `${name}() did not send the X-Authorization mirror. Proxies that strip the ` +
            'standard header make this the only surviving credential. A product that ' +
            'deliberately sets mirrorAuthorizationHeader: false must declare an exemption ' +
            'for C1-1 and C1-2 with a reason and a ref (#119).',
          'C1-1',
        );
      }
    },
  },
  {
    id: 'C1-2',
    group: 'C1',
    required: true,
    title: 'C1-2 per-request headers cannot drop or overwrite the auth headers',
    async run(deps) {
      const { wiring, transport, recorder } = drive(deps, okResponder);
      wiring.seedToken(TOKEN);
      await transport.get('/contract/get', {
        headers: {
          Authorization: 'Bearer forged-by-caller',
          'X-Authorization': 'Bearer forged-by-caller',
          'X-Contract-Probe': 'applied',
        },
      });
      const recorded = recorder.calls[0];
      assertContract(recorded !== undefined, 'no request was made', 'C1-2');
      // Positive control: per-request headers must still reach the wire, so a
      // transport that silently drops *all* of them cannot pass this case.
      assertContract(
        recorded.headers.get('X-Contract-Probe') === 'applied',
        'per-request headers were dropped entirely',
        'C1-2',
      );
      assertContract(
        recorded.headers.get('Authorization') === `Bearer ${TOKEN}`,
        'a per-request header overwrote Authorization',
        'C1-2',
      );
      assertContract(
        recorded.headers.get('X-Authorization') === `Bearer ${TOKEN}`,
        'a per-request header overwrote or dropped the X-Authorization mirror',
        'C1-2',
      );
    },
  },
  {
    id: 'C1-3',
    group: 'C1',
    required: true,
    title: 'C1-3 signed out sends no auth headers at all',
    async run(deps) {
      const { wiring, transport, recorder } = drive(deps, okResponder);
      requireStore(wiring, 'C1-3').clearToken();
      await transport.get('/contract/public');
      const recorded = recorder.calls[0];
      assertContract(recorded !== undefined, 'no request was made', 'C1-3');
      assertContract(
        !recorded.headers.has('Authorization'),
        'an Authorization header was sent while signed out',
        'C1-3',
      );
      assertContract(
        !recorded.headers.has('X-Authorization'),
        'an X-Authorization header was sent while signed out',
        'C1-3',
      );
    },
  },
  {
    id: 'C1-4',
    group: 'C1',
    required: true,
    title: 'C1-4 the token store is read on every request (token rotation is picked up)',
    async run(deps) {
      const { wiring, transport, recorder } = drive(deps, okResponder);
      wiring.seedToken(TOKEN);
      await transport.get('/contract/first');
      wiring.seedToken(ROTATED_TOKEN);
      await transport.get('/contract/second');
      const first = recorder.calls[0];
      const second = recorder.calls[1];
      assertContract(first !== undefined && second !== undefined, 'expected two requests', 'C1-4');
      assertContract(
        first.headers.get('Authorization') === `Bearer ${TOKEN}`,
        'the first request did not carry the seeded token',
        'C1-4',
      );
      assertContract(
        second.headers.get('Authorization') === `Bearer ${ROTATED_TOKEN}`,
        'the second request carried a stale token — the store is being cached instead of ' +
          'read per request, so a rotated token would never reach the server',
        'C1-4',
      );
    },
  },

  // ── C2 · token storage ────────────────────────────────────────────────────
  {
    id: 'C2-5',
    group: 'C2',
    required: true,
    title: 'C2-5 the token lands in sessionStorage only, never in localStorage',
    run: sync((deps) => {
      const ambient = globalThis as { sessionStorage?: Storage; localStorage?: Storage };
      const session = deps.sessionStorage ?? ambient.sessionStorage;
      const local = deps.localStorage ?? ambient.localStorage;
      assertContract(
        session !== undefined,
        'no sessionStorage is available. Run the contract in a browser-like environment ' +
          "(vitest `environment: 'jsdom'`), pass `sessionStorage` in the deps, or declare an " +
          'exemption for C2-5 if this product does not use sessionStorage (e.g. a cookie session).',
        'C2-5',
      );
      const wiring = deps.createWiring({});
      const store = requireStore(wiring, 'C2-5');
      try {
        wiring.seedToken(TOKEN);
        assertContract(
          findStoredValue(session, TOKEN) !== null,
          'the token was not written to sessionStorage',
          'C2-5',
        );
        if (local !== undefined) {
          const leakedKey = findStoredValue(local, TOKEN);
          assertContract(
            leakedKey === null,
            `the token was written to localStorage under "${leakedKey ?? ''}" — localStorage ` +
              'survives browser restarts and widens the XSS blast radius (L1 ban)',
            'C2-5',
          );
        }
      } finally {
        store.clearToken();
      }
    }),
  },
  {
    id: 'C2-6',
    group: 'C2',
    required: true,
    title: 'C2-6 the store fails closed when storage is unavailable',
    run: sync((deps) => {
      const wiring = deps.createWiring({ storage: createHostileStorage() });
      const store = requireStore(wiring, 'C2-6');
      let thrown: unknown;
      try {
        wiring.seedToken(TOKEN);
      } catch (error) {
        thrown = error;
      }
      assertContract(
        thrown === undefined,
        'seeding a token threw when storage was unavailable. Privacy mode and blocked ' +
          'cookies make every storage call throw; the store must swallow it and read as ' +
          `signed out. Got: ${String(thrown)}`,
        'C2-6',
      );
      let read: string | null = null;
      let readThrew: unknown;
      try {
        read = store.getToken();
      } catch (error) {
        readThrew = error;
      }
      assertContract(
        readThrew === undefined,
        `getToken() threw when storage was unavailable: ${String(readThrew)}`,
        'C2-6',
      );
      assertContract(
        read === null,
        'getToken() returned a token although storage was unavailable. Either the store did ' +
          'not fail closed, or `createWiring` ignored the `storage` override it was handed ' +
          '(the product must forward it to its token store).',
        'C2-6',
      );
    }),
  },
  {
    id: 'C2-7',
    group: 'C2',
    required: true,
    title: 'C2-7 clearToken() removes the token (the logout path)',
    run: sync((deps) => {
      const wiring = deps.createWiring({});
      const store = requireStore(wiring, 'C2-7');
      wiring.seedToken(TOKEN);
      assertContract(
        store.getToken() === TOKEN,
        'the seeded token was not readable through the store — `seedToken` and ' +
          '`config.tokenStore` must address the same store instance',
        'C2-7',
      );
      store.clearToken();
      assertContract(
        store.getToken() === null,
        'clearToken() left the token readable — logout would not sign the user out',
        'C2-7',
      );
    }),
  },

  // ── C3 · 401 / 403 ────────────────────────────────────────────────────────
  {
    id: 'C3-8',
    group: 'C3',
    required: true,
    title: 'C3-8 a 401 on an authenticated request clears the token and calls onUnauthorized',
    async run(deps) {
      // Recovery is neutralised so this case measures the fail-closed path only.
      const { wiring, transport, instrumented } = drive(deps, () => contractProblemResponse(401), {
        recoverAuth: () => Promise.resolve(false),
      });
      assertContract(
        typeof wiring.config.onUnauthorized === 'function',
        'the product did not wire `onUnauthorized`. Without it an expired session fails ' +
          'silently and the UI keeps rendering as if signed in.',
        'C3-8',
      );
      const store = requireStore(wiring, 'C3-8');
      wiring.seedToken(TOKEN);
      await expectRejection(transport.get('/contract/authed'), 'C3-8', 'a 401 with a token');
      assertContract(
        store.getToken() === null,
        'the token survived a 401 — the session is expired but the app would keep sending it. ' +
          'Check `clearTokenOnStatuses` (default [401]).',
        'C3-8',
      );
      assertContract(
        instrumented.unauthorized.length === 1,
        `onUnauthorized fired ${String(instrumented.unauthorized.length)} times, expected once`,
        'C3-8',
      );
      const context = instrumented.unauthorized[0];
      assertContract(
        context !== undefined && context.status === 401 && context.tokenAttached,
        'onUnauthorized received the wrong context (expected status 401, tokenAttached true)',
        'C3-8',
      );
    },
  },
  {
    id: 'C3-9',
    group: 'C3',
    required: true,
    title: 'C3-9 a credentials 401 (no token) does not clear state or notify',
    async run(deps) {
      const { wiring, transport, instrumented } = drive(deps, () => contractProblemResponse(401), {
        recoverAuth: () => Promise.resolve(false),
      });
      requireStore(wiring, 'C3-9').clearToken();
      await expectRejection(
        transport.post('/contract/login', { password: 'wrong' }),
        'C3-9',
        'a 401 without a token',
      );
      assertContract(
        instrumented.unauthorized.length === 0,
        'onUnauthorized fired for a 401 on an unauthenticated request. Wrong credentials on ' +
          'the login form would then trigger the session-expired path and tear down the ' +
          'login screen the user is standing on.',
        'C3-9',
      );
    },
  },
  {
    id: 'C3-10',
    group: 'C3',
    required: true,
    title: 'C3-10 a 403 keeps the token (authenticated, just not permitted)',
    async run(deps) {
      const { wiring, transport } = drive(deps, () => contractProblemResponse(403), {
        recoverAuth: () => Promise.resolve(false),
      });
      const store = requireStore(wiring, 'C3-10');
      wiring.seedToken(TOKEN);
      await expectRejection(transport.get('/contract/forbidden'), 'C3-10', 'a 403');
      assertContract(
        store.getToken() === TOKEN,
        'a 403 cleared the token. The session is still valid — the user merely lacks a ' +
          'permission — so this signs people out of the whole app on one forbidden panel. ' +
          'Check `clearTokenOnStatuses`.',
        'C3-10',
      );
    },
  },

  // ── C4 · silent re-authentication ─────────────────────────────────────────
  {
    id: 'C4-11',
    group: 'C4',
    required: true,
    title: 'C4-11 recoverAuth fails closed (false / throw) and never loops',
    async run(deps) {
      const probe = deps.createWiring({});
      assertContract(
        typeof probe.config.recoverAuth === 'function',
        'the product did not configure `recoverAuth`, so the C4 recovery contract cannot be ' +
          'measured. Wire it (ADR 0008) or declare exemptions for C4-11 and C4-12 with a ' +
          'reason and a ref.',
        'C4-11',
      );

      // (a) recovery declines → no replay, fail closed.
      const declined = drive(deps, () => contractProblemResponse(401), {
        recoverAuth: () => Promise.resolve(false),
      });
      const declinedStore = requireStore(declined.wiring, 'C4-11');
      declined.wiring.seedToken(TOKEN);
      await expectRejection(
        declined.transport.get('/contract/authed'),
        'C4-11',
        'a declined recovery',
      );
      assertContract(
        declined.recorder.calls.length === 1,
        `recovery returned false but the request was still replayed ` +
          `(${String(declined.recorder.calls.length)} requests)`,
        'C4-11',
      );
      assertContract(
        declinedStore.getToken() === null,
        'a declined recovery left the token in place instead of failing closed',
        'C4-11',
      );

      // (b) recovery throws → treated as a declined recovery, not a thrown request.
      const threw = drive(deps, () => contractProblemResponse(401), {
        recoverAuth: () => Promise.reject(new Error('contract: refresh endpoint unreachable')),
      });
      threw.wiring.seedToken(TOKEN);
      await expectRejection(threw.transport.get('/contract/authed'), 'C4-11', 'a thrown recovery');
      assertContract(
        threw.recorder.calls.length === 1,
        `recovery threw but the request was still replayed ` +
          `(${String(threw.recorder.calls.length)} requests)`,
        'C4-11',
      );
      assertContract(
        requireStore(threw.wiring, 'C4-11').getToken() === null,
        'a thrown recovery left the token in place instead of failing closed',
        'C4-11',
      );

      // (c) recovery claims success but seats nothing → exactly one replay, then stop.
      const looping = drive(deps, () => contractProblemResponse(401), {
        recoverAuth: () => Promise.resolve(true),
      });
      looping.wiring.seedToken(TOKEN);
      await expectRejection(
        looping.transport.get('/contract/authed'),
        'C4-11',
        'a recovery that seats no token',
      );
      assertContract(
        looping.recorder.calls.length === 2,
        'a recovery that reports success without seating a token must be replayed exactly ' +
          `once and then fail closed; saw ${String(looping.recorder.calls.length)} requests ` +
          '(1 = no replay at all, >2 = the replay re-entered recovery)',
        'C4-11',
      );
      assertContract(
        looping.instrumented.recoverCalls() === 1,
        `recovery was entered ${String(looping.instrumented.recoverCalls())} times for one ` +
          'request — the replay must not re-enter recovery',
        'C4-11',
      );
    },
  },
  {
    id: 'C4-12',
    group: 'C4',
    required: true,
    title: 'C4-12 concurrent 401s collapse into a single recovery (single-flight)',
    async run(deps) {
      const probe = deps.createWiring({});
      assertContract(
        typeof probe.config.recoverAuth === 'function',
        'the product did not configure `recoverAuth`; declare exemptions for C4-11 and C4-12 ' +
          'if that is deliberate.',
        'C4-12',
      );

      let seated = false;
      let release: () => void = () => undefined;
      const gate = new Promise<void>((resolve) => {
        release = resolve;
      });

      const { wiring, transport, instrumented, recorder } = drive(
        deps,
        () => (seated ? contractJsonResponse() : contractProblemResponse(401)),
        {
          recoverAuth: async (w): Promise<boolean> => {
            // Hold recovery open so every concurrent caller is inside the window.
            await gate;
            w.seedToken(REFRESHED_TOKEN);
            seated = true;
            return true;
          },
        },
      );
      wiring.seedToken(TOKEN);

      const inFlight = [
        transport.get('/contract/a'),
        transport.get('/contract/b'),
        transport.recover(),
      ];
      // Let both requests reach the 401 handler and enter recovery.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });
      release();
      const settled = await Promise.allSettled(inFlight);

      assertContract(
        instrumented.recoverCalls() === 1,
        `recovery ran ${String(instrumented.recoverCalls())} times for concurrent 401s. Under ` +
          'refresh-token rotation a second concurrent refresh presents an already-rotated ' +
          'token and trips server-side reuse detection — the whole token family is revoked ' +
          'and the user is hard-logged-out. The app-start probe must call `transport.recover()`, ' +
          'not `recoverAuth` directly, so it shares this single-flight.',
        'C4-12',
      );
      const rejected = settled.filter((result) => result.status === 'rejected').length;
      assertContract(
        rejected === 0,
        `${String(rejected)} of ${String(settled.length)} callers failed after a successful ` +
          'recovery — every caller sharing the in-flight recovery must be replayed',
        'C4-12',
      );
      assertContract(
        recorder.calls.length === 4,
        `expected 4 requests (2 initial 401s + 2 replays), saw ${String(recorder.calls.length)}`,
        'C4-12',
      );
    },
  },

  // ── C5 · leakage (optional) ───────────────────────────────────────────────
  {
    id: 'C5-13',
    group: 'C5',
    required: false,
    title: 'C5-13 the bearer token never appears in a request URL',
    async run(deps) {
      const { wiring, transport, recorder } = drive(deps, okResponder);
      wiring.seedToken(TOKEN);
      for (const [, call] of ALL_PATHS) {
        await call(transport);
      }
      for (const recorded of recorder.calls) {
        assertContract(
          !recorded.url.includes(TOKEN),
          `the token appeared in a request URL (${recorded.url}) — URLs reach access logs, ` +
            'Referer headers and browser history',
          'C5-13',
        );
      }
    },
  },
];

/** Required cases make up the mandatory contract; C5 is opt-in. */
export const REQUIRED_CASE_IDS: readonly ContractCaseId[] = CONTRACT_CASES.filter(
  (contractCase) => contractCase.required,
).map((contractCase) => contractCase.id);
