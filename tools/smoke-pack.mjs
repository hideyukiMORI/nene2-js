#!/usr/bin/env node
/**
 * Install the tarball from `npm pack` and import the public entry.
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const staging = mkdtempSync(join(tmpdir(), 'nene2-pack-'));

try {
  execSync('npm run build', { cwd: root, stdio: 'inherit' });
  execSync(`npm pack --pack-destination "${staging}"`, { cwd: root, stdio: 'inherit' });
  const tgz = readdirSync(staging).find((f) => f.endsWith('.tgz'));
  if (tgz === undefined) {
    throw new Error('npm pack did not produce a .tgz');
  }

  writeFileSync(
    join(staging, 'package.json'),
    JSON.stringify({ name: 'pack-smoke', private: true, type: 'module' }, null, 2),
  );
  execSync(`npm install "${join(staging, tgz)}"`, { cwd: staging, stdio: 'inherit' });

  // Probe the *installed* package, which is the only place that proves what a
  // ship actually receives. fleet #232 found the transport contract missing from
  // every ship's node_modules while the repo's own tests were green — a check
  // that runs inside the repo cannot see the `files` boundary.
  writeFileSync(
    join(staging, 'probe.mjs'),
    `import { readFileSync } from 'node:fs';
import { createNene2Client, createNene2Transport, createSessionTokenStore, NENE2_CLIENT_PACKAGE }
  from '@hideyukimori/nene2-client';
import { runTransportContract, expectAuthHeaderMirror, CONTRACT_CASES, NENE2_CLIENT_VERSION }
  from '@hideyukimori/nene2-client/testing';

const fail = (message) => { console.error('pack smoke: ' + message); process.exit(1); };

if (typeof createNene2Client !== 'function') fail('createNene2Client missing');
if (typeof createNene2Transport !== 'function') fail('createNene2Transport missing');
if (typeof createSessionTokenStore !== 'function') fail('createSessionTokenStore missing');
if (NENE2_CLIENT_PACKAGE !== '@hideyukimori/nene2-client') fail('package constant wrong');

const dts = readFileSync('node_modules/@hideyukimori/nene2-client/dist/index.d.ts', 'utf8');
if (!dts.includes('OpenApiPaths') || !dts.includes('OpenApiSchemas')) {
  fail('missing OpenApiPaths/OpenApiSchemas in pack');
}

// ./testing must arrive with the tarball, not just exist in the repo.
if (typeof runTransportContract !== 'function') fail('runTransportContract missing from ./testing');
if (typeof expectAuthHeaderMirror !== 'function') fail('L-a helpers missing from ./testing');
const required = CONTRACT_CASES.filter((entry) => entry.required).length;
if (required !== 12) fail('expected 12 required contract cases, got ' + required);

const pkg = JSON.parse(
  readFileSync('node_modules/@hideyukimori/nene2-client/package.json', 'utf8'),
);
if (pkg.version !== NENE2_CLIENT_VERSION) {
  fail('contract version stamp ' + NENE2_CLIENT_VERSION + ' != package version ' + pkg.version);
}
const testingTypes = readFileSync(
  'node_modules/@hideyukimori/nene2-client/dist/testing/index.d.ts', 'utf8',
);
if (!testingTypes.includes('runTransportContract')) fail('./testing types missing from pack');
`,
  );
  execSync('node probe.mjs', { cwd: staging, stdio: 'inherit' });
  console.log('pack smoke: ok (including ./testing)');
} finally {
  rmSync(staging, { recursive: true, force: true });
}
