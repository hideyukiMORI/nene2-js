/**
 * Version stamp reported by {@link runTransportContract} (issue #123).
 *
 * A contract test is a device whose purpose is to be **green**, so a stale
 * contract looks exactly like a fresh one. Ships pin via caret but their
 * lockfiles do not move on their own (fleet #232 measured 10 of 11 products
 * still on 1.1.0 while 1.2.0 was published), so the run must say which contract
 * it actually ran.
 *
 * Kept in sync with `package.json` by `tests/testing/version.test.ts` — bumping
 * the package without bumping this constant fails the build.
 */
export const NENE2_CLIENT_VERSION = '1.2.0';
