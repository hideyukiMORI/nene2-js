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
  execSync(
    `node --input-type=module -e "import { readFileSync } from 'node:fs'; import { join } from 'node:path'; import { createNene2Client, createNene2Transport, createSessionTokenStore, NENE2_CLIENT_PACKAGE } from '@hideyukimori/nene2-client'; if (typeof createNene2Client !== 'function' || typeof createNene2Transport !== 'function' || typeof createSessionTokenStore !== 'function' || NENE2_CLIENT_PACKAGE !== '@hideyukimori/nene2-client') process.exit(1); const dts = readFileSync(join('node_modules/@hideyukimori/nene2-client/dist/index.d.ts'), 'utf8'); if (!dts.includes('OpenApiPaths') || !dts.includes('OpenApiSchemas')) { console.error('missing OpenApiPaths/OpenApiSchemas in pack'); process.exit(1); }"`,
    { cwd: staging, stdio: 'inherit' },
  );
  console.log('pack smoke: ok');
} finally {
  rmSync(staging, { recursive: true, force: true });
}
