/**
 * Invariant 2 (#102): the token lives in sessionStorage ONLY (fleet decision
 * 2026-07-14, nene-vault #148 shape) under the app-specified key, with an
 * in-memory fallback for non-browser environments, and is never persisted
 * anywhere else (no localStorage, no cookies, no URL).
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSessionTokenStore } from '../../src/index.js';
import { createFakeStorage, createThrowingStorage } from './helpers.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('createSessionTokenStore', () => {
  it('stores the token under the given key in the provided (session) storage only', () => {
    const storage = createFakeStorage();
    const store = createSessionTokenStore({ key: 'nene_myproduct_token', storage });

    store.setToken('jwt-1');

    expect(storage.data.get('nene_myproduct_token')).toBe('jwt-1');
    expect(storage.data.size).toBe(1);
    expect(store.getToken()).toBe('jwt-1');
    // Node test environment: no localStorage exists to leak into.
    expect((globalThis as { localStorage?: Storage }).localStorage).toBeUndefined();
  });

  it('uses globalThis.sessionStorage by default when available', () => {
    const fake = createFakeStorage();
    vi.stubGlobal('sessionStorage', fake);
    const store = createSessionTokenStore({ key: 'k' });

    store.setToken('jwt-2');

    expect(fake.data.get('k')).toBe('jwt-2');
    expect(store.getToken()).toBe('jwt-2');
  });

  it('falls back to in-memory when sessionStorage is unavailable (SSR / tests)', () => {
    const store = createSessionTokenStore({ key: 'k' });

    expect(store.getToken()).toBeNull();
    store.setToken('jwt-3');
    expect(store.getToken()).toBe('jwt-3');
    store.clearToken();
    expect(store.getToken()).toBeNull();
  });

  it('clearToken removes the token (logout path)', () => {
    const storage = createFakeStorage();
    const store = createSessionTokenStore({ key: 'k', storage });
    store.setToken('jwt-4');

    store.clearToken();

    expect(store.getToken()).toBeNull();
    expect(storage.data.has('k')).toBe(false);
  });

  it('notifies subscribers on set and clear, and unsubscribes cleanly', () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    let notified = 0;
    const unsubscribe = store.subscribe(() => {
      notified += 1;
    });

    store.setToken('a');
    store.clearToken();
    expect(notified).toBe(2);

    unsubscribe();
    store.setToken('b');
    expect(notified).toBe(2);
  });

  it('fails closed when storage access throws (reads as signed out, writes ignored)', () => {
    const store = createSessionTokenStore({ key: 'k', storage: createThrowingStorage() });

    expect(store.getToken()).toBeNull();
    expect(() => {
      store.setToken('jwt-5');
    }).not.toThrow();
    expect(() => {
      store.clearToken();
    }).not.toThrow();
    expect(store.getToken()).toBeNull();
  });
});
