#!/usr/bin/env node
/**
 * Sync or verify the pinned NENE2 OpenAPI contract under contracts/.
 * @see docs/adr/0002-openapi-contract-pin-policy.md
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pinPath = resolve(root, 'contracts/nene2-openapi-pin.json');
const contractPath = resolve(root, 'contracts/openapi.yaml');
const checkOnly = process.argv.includes('--check');

const defaultSibling = resolve(root, '../NENE2/docs/openapi/openapi.yaml');

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function readPin() {
  return JSON.parse(readFileSync(pinPath, 'utf8'));
}

function writePin(pin) {
  writeFileSync(pinPath, `${JSON.stringify(pin, null, 2)}\n`, 'utf8');
}

function parseInfoVersion(yaml) {
  const match = yaml.match(/^info:\s*\n(?:[ \t].*\n)*?[ \t]+version:\s*([^\n#]+)/m);
  return match?.[1]?.trim() ?? null;
}

async function loadSource(pin) {
  const envPath = process.env.NENE2_JS_OPENAPI_PATH;
  const sibling = envPath ? resolve(root, envPath) : defaultSibling;

  try {
    const content = readFileSync(sibling, 'utf8');
    return { content, source: sibling };
  } catch {
    const url = `https://raw.githubusercontent.com/hideyukiMORI/NENE2/${pin.nene2GitRef}/${pin.sourcePath}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch OpenAPI from ${url} (${res.status})`);
    }
    return { content: await res.text(), source: url };
  }
}

function loadCommitted() {
  return readFileSync(contractPath, 'utf8');
}

async function runCheck(pin) {
  const committed = loadCommitted();
  const hash = sha256(committed);
  if (hash !== pin.contractSha256) {
    console.error('contracts:check failed: openapi.yaml SHA-256 does not match pin.');
    console.error(`  pin:      ${pin.contractSha256}`);
    console.error(`  actual:   ${hash}`);
    console.error('Run: npm run contracts:sync');
    process.exit(1);
  }

  const infoVersion = parseInfoVersion(committed);
  if (infoVersion && pin.openapiInfoVersion && infoVersion !== pin.openapiInfoVersion) {
    console.error('contracts:check failed: info.version mismatch.');
    console.error(`  pin:    ${pin.openapiInfoVersion}`);
    console.error(`  yaml:   ${infoVersion}`);
    process.exit(1);
  }

  console.log(
    `contracts:check ok (ref ${pin.nene2GitRef}, openapi ${pin.openapiInfoVersion ?? infoVersion})`,
  );
}

async function runSync(pin) {
  const { content, source } = await loadSource(pin);
  const infoVersion = parseInfoVersion(content);
  const nextPin = {
    ...pin,
    openapiInfoVersion: infoVersion ?? pin.openapiInfoVersion,
    contractSha256: sha256(content),
    syncedAt: new Date().toISOString().slice(0, 10),
    syncedFrom: source,
  };

  writeFileSync(contractPath, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
  writePin(nextPin);
  console.log(`contracts:sync ok → ${contractPath}`);
  console.log(`  ref: ${nextPin.nene2GitRef}, openapi: ${nextPin.openapiInfoVersion}`);
}

const pin = readPin();

if (checkOnly) {
  await runCheck(pin);
} else {
  await runSync(pin);
}
