/**
 * Bearer-token storage for {@link createNene2Transport} (issue #102).
 *
 * Fleet default: `sessionStorage` (decision 2026-07-14, mirroring nene-vault #148 —
 * XSS blast radius is bounded because the token does not persist across browser
 * restarts). Non-browser environments (tests, SSR, Node scripts) fall back to an
 * in-memory store with the same surface.
 *
 * The store never serializes the token into a URL and never uses `localStorage`.
 */

/**
 * Minimal contract the transport needs. Products with their own session store
 * (e.g. a richer session object) can adapt it to this interface.
 */
export interface TokenStore {
  /** Current bearer token, or `null` when signed out. */
  getToken(): string | null;
  /** Remove the token — logout, or automatic 401 handling by the transport. */
  clearToken(): void;
}

/**
 * Full surface of the built-in sessionStorage-backed store.
 */
export interface SessionTokenStore extends TokenStore {
  /** Store the token after a successful sign-in. */
  setToken(token: string): void;
  /**
   * Subscribe to token changes (e.g. React `useSyncExternalStore` in an auth
   * shell). Returns the unsubscribe function. Only mutations made through this
   * store instance notify.
   */
  subscribe(listener: () => void): () => void;
}

export interface SessionTokenStoreOptions {
  /** App-specific storage key, e.g. `nene_<product>_token`. */
  readonly key: string;
  /**
   * Storage override (tests). Default: `globalThis.sessionStorage` when
   * available, otherwise an in-memory fallback.
   */
  readonly storage?: Storage | undefined;
}

function resolveStorage(override: Storage | undefined): Storage | undefined {
  if (override !== undefined) {
    return override;
  }
  try {
    // Not typed as optional in lib.dom, but absent in Node / SSR runtimes.
    return (globalThis as { sessionStorage?: Storage }).sessionStorage;
  } catch {
    // Some browser modes throw on any storage access (e.g. blocked cookies).
    return undefined;
  }
}

/**
 * Create the fleet-standard token store: `sessionStorage` in browsers, in-memory
 * elsewhere. Storage failures (quota, privacy mode) are swallowed — reads then
 * behave as signed-out, which fails closed.
 */
export function createSessionTokenStore(options: SessionTokenStoreOptions): SessionTokenStore {
  const storage = resolveStorage(options.storage);
  let memoryToken: string | null = null;
  const listeners = new Set<() => void>();

  function notify(): void {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    getToken(): string | null {
      if (storage === undefined) {
        return memoryToken;
      }
      try {
        return storage.getItem(options.key);
      } catch {
        return null;
      }
    },
    setToken(token: string): void {
      if (storage === undefined) {
        memoryToken = token;
      } else {
        try {
          storage.setItem(options.key, token);
        } catch {
          // ignore persistence failure (fails closed on the next read)
        }
      }
      notify();
    },
    clearToken(): void {
      if (storage === undefined) {
        memoryToken = null;
      } else {
        try {
          storage.removeItem(options.key);
        } catch {
          // ignore
        }
      }
      notify();
    },
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
