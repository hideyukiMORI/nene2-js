/**
 * The `./testing` subpath only helps if it actually leaves the repository.
 * fleet #232's finding was exactly this: the unified unit tests existed, ran,
 * and were green — outside `files`, so no ship ever received them (issue #123).
 *
 * `npm run pack:smoke` proves the installed tarball resolves the subpath; these
 * assertions guard the declarations that make that possible.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NENE2_CLIENT_VERSION } from '../../src/testing/index.js';

interface PackageManifest {
  readonly version: string;
  readonly files: readonly string[];
  readonly exports: Record<string, Record<string, string> | string>;
}

const manifest = JSON.parse(readFileSync('package.json', 'utf8')) as PackageManifest;

describe('./testing is declared as a distributed subpath', () => {
  it('is exported with types, import and default conditions', () => {
    expect(manifest.exports['./testing']).toStrictEqual({
      types: './dist/testing/index.d.ts',
      import: './dist/testing/index.js',
      default: './dist/testing/index.js',
    });
  });

  it('is inside a published directory', () => {
    expect(manifest.files).toContain('dist');
  });
});

describe('the contract version stamp', () => {
  it('matches the package version, so a stale pin is visible in the run', () => {
    expect(NENE2_CLIENT_VERSION).toBe(manifest.version);
  });
});
