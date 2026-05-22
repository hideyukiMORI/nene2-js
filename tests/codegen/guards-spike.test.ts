import { readFileSync } from 'node:fs';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { generateGuardModuleSource } from '../../tools/codegen-guards-spike.mjs';
import {
  isExampleNoteListResponse,
  isExampleNoteResponse,
  isCreateNoteRequest,
} from '../../src/types/examples/notes.js';
import {
  isExampleTagListResponse,
  isExampleTagResponse,
  isCreateTagRequest,
} from '../../src/types/examples/tags.js';
import { isProtectedResponse } from '../../src/types/examples/protected.js';
import {
  isExamplePingResponse,
  isFrameworkSmokeResponse,
  isHealthResponse,
  isMachineHealthResponse,
} from '../../src/types/system.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const openapiPath = resolve(root, 'contracts/openapi.yaml');
const fixturesRoot = resolve(root, 'tests/fixtures');

const HAND_GUARDS = {
  isHealthResponse,
  isExamplePingResponse,
  isFrameworkSmokeResponse,
  isMachineHealthResponse,
  isExampleNoteResponse,
  isExampleNoteListResponse,
  isCreateNoteRequest,
  isExampleTagResponse,
  isExampleTagListResponse,
  isCreateTagRequest,
  isProtectedResponse,
};

const FIXTURE_CASES: { guard: keyof typeof HAND_GUARDS; fixture: string }[] = [
  { guard: 'isHealthResponse', fixture: 'system/health-ok.json' },
  { guard: 'isHealthResponse', fixture: 'system/health-degraded.json' },
  { guard: 'isExamplePingResponse', fixture: 'system/ping-ok.json' },
  { guard: 'isFrameworkSmokeResponse', fixture: 'system/framework-smoke-ok.json' },
  { guard: 'isMachineHealthResponse', fixture: 'system/machine-health-ok.json' },
  { guard: 'isExampleNoteResponse', fixture: 'examples/note-ok.json' },
  { guard: 'isExampleNoteListResponse', fixture: 'examples/notes-list-ok.json' },
  { guard: 'isExampleTagResponse', fixture: 'examples/tag-ok.json' },
  { guard: 'isExampleTagListResponse', fixture: 'examples/tags-list-ok.json' },
  { guard: 'isProtectedResponse', fixture: 'examples/protected-ok.json' },
];

describe('guard codegen spike (#86 Phase A)', () => {
  it('generates ESM standalone module for client schemas', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- mjs spike
    const { moduleSource, schemaNames } = await generateGuardModuleSource(openapiPath);
    expect(schemaNames).toHaveLength(11);
    expect(moduleSource).not.toContain('require(');
    expect(moduleSource).toContain('function validateHealthResponse');
    expect(moduleSource).toContain('isHealthResponseGenerated');
  });

  it('generated guards agree with hand guards on OpenAPI fixtures', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- mjs spike
    const { moduleSource } = await generateGuardModuleSource(openapiPath);
    const dir = mkdtempSync(resolve(tmpdir(), 'nene2-guard-spike-test-'));
    const modulePath = resolve(dir, 'guards.generated.mjs');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- generated JS module body
    writeFileSync(modulePath, moduleSource, 'utf8');

    try {
      const generated = (await import(pathToFileURL(modulePath).href)) as Record<
        string,
        (value: unknown) => boolean
      >;

      for (const { guard, fixture } of FIXTURE_CASES) {
        const json = JSON.parse(readFileSync(resolve(fixturesRoot, fixture), 'utf8')) as unknown;
        const hand = HAND_GUARDS[guard](json);
        const generatedFn = generated[`${guard}Generated`];
        expect(generatedFn, `${guard}Generated missing`).toBeTypeOf('function');
        expect(generatedFn(json)).toBe(hand);
      }

      expect(generated.isCreateNoteRequestGenerated({ title: 'a', body: 'b' })).toBe(true);
      expect(generated.isCreateNoteRequestGenerated({ title: '', body: 'b' })).toBe(false);
      expect(generated.isCreateTagRequestGenerated({ name: 'x' })).toBe(true);
      expect(generated.isCreateTagRequestGenerated({ name: '' })).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
