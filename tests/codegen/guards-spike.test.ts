import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  validateCreateNoteRequest,
  validateCreateTagRequest,
  validateExampleNoteListResponse,
  validateExampleNoteResponse,
  validateExamplePingResponse,
  validateExampleTagListResponse,
  validateExampleTagResponse,
  validateFrameworkSmokeResponse,
  validateHealthResponse,
  validateMachineHealthResponse,
  validateProtectedResponse,
} from '../../src/generated/guards.js';
import {
  isCreateNoteRequest,
  isExampleNoteListResponse,
  isExampleNoteResponse,
} from '../../src/index.js';
import {
  isCreateTagRequest,
  isExampleTagListResponse,
  isExampleTagResponse,
} from '../../src/types/examples/tags.js';
import { isProtectedResponse } from '../../src/types/examples/protected.js';
import {
  isExamplePingResponse,
  isFrameworkSmokeResponse,
  isHealthResponse,
  isMachineHealthResponse,
} from '../../src/types/system.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const fixturesRoot = resolve(root, 'tests/fixtures');

const VALIDATORS = {
  validateHealthResponse,
  validateExamplePingResponse,
  validateFrameworkSmokeResponse,
  validateMachineHealthResponse,
  validateExampleNoteResponse,
  validateExampleNoteListResponse,
  validateCreateNoteRequest,
  validateExampleTagResponse,
  validateExampleTagListResponse,
  validateCreateTagRequest,
  validateProtectedResponse,
};

const PUBLIC_GUARDS = {
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

const FIXTURE_CASES: {
  validator: keyof typeof VALIDATORS;
  guard: keyof typeof PUBLIC_GUARDS;
  fixture: string;
}[] = [
  {
    validator: 'validateHealthResponse',
    guard: 'isHealthResponse',
    fixture: 'system/health-ok.json',
  },
  {
    validator: 'validateHealthResponse',
    guard: 'isHealthResponse',
    fixture: 'system/health-degraded.json',
  },
  {
    validator: 'validateExamplePingResponse',
    guard: 'isExamplePingResponse',
    fixture: 'system/ping-ok.json',
  },
  {
    validator: 'validateFrameworkSmokeResponse',
    guard: 'isFrameworkSmokeResponse',
    fixture: 'system/framework-smoke-ok.json',
  },
  {
    validator: 'validateMachineHealthResponse',
    guard: 'isMachineHealthResponse',
    fixture: 'system/machine-health-ok.json',
  },
  {
    validator: 'validateExampleNoteResponse',
    guard: 'isExampleNoteResponse',
    fixture: 'examples/note-ok.json',
  },
  {
    validator: 'validateExampleNoteListResponse',
    guard: 'isExampleNoteListResponse',
    fixture: 'examples/notes-list-ok.json',
  },
  {
    validator: 'validateExampleTagResponse',
    guard: 'isExampleTagResponse',
    fixture: 'examples/tag-ok.json',
  },
  {
    validator: 'validateExampleTagListResponse',
    guard: 'isExampleTagListResponse',
    fixture: 'examples/tags-list-ok.json',
  },
  {
    validator: 'validateProtectedResponse',
    guard: 'isProtectedResponse',
    fixture: 'examples/protected-ok.json',
  },
];

describe('generated guards (ADR 0007, #86 Phase B)', () => {
  it('committed guards.ts has no require() and exports validators', () => {
    const source = readFileSync(resolve(root, 'src/generated/guards.ts'), 'utf8');
    expect(source).not.toContain('require(');
    expect(source).toContain('export function validateHealthResponse');
  });

  it('validators and public is* guards agree on fixtures', () => {
    for (const { validator, guard, fixture } of FIXTURE_CASES) {
      const json = JSON.parse(readFileSync(resolve(fixturesRoot, fixture), 'utf8')) as unknown;
      const validateFn = VALIDATORS[validator];
      const guardFn = PUBLIC_GUARDS[guard];
      expect(validateFn(json)).toBe(true);
      expect(guardFn(json)).toBe(true);
    }

    expect(validateCreateNoteRequest({ title: 'a', body: 'b' })).toBe(true);
    expect(isCreateNoteRequest({ title: '', body: 'b' })).toBe(false);
    expect(validateCreateTagRequest({ name: 'x' })).toBe(true);
    expect(isCreateTagRequest({ name: '' })).toBe(false);
  });
});
