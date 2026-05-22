import { describe, expectTypeOf, it } from 'vitest';
import type { components } from '../../src/generated/openapi.js';
import type {
  ExamplePingResponse,
  HealthResponse,
  MachineHealthResponse,
} from '../../src/types/system.js';

type Schemas = components['schemas'];

describe('generated OpenAPI schemas vs hand types', () => {
  it('HealthResponse aligns with generated schema', () => {
    expectTypeOf<HealthResponse>().toMatchTypeOf<Schemas['HealthResponse']>();
    expectTypeOf<Schemas['HealthResponse']>().toMatchTypeOf<HealthResponse>();
  });

  it('ExamplePingResponse aligns with generated schema', () => {
    expectTypeOf<ExamplePingResponse>().toMatchTypeOf<Schemas['ExamplePingResponse']>();
  });

  it('MachineHealthResponse aligns with generated schema', () => {
    expectTypeOf<MachineHealthResponse>().toMatchTypeOf<Schemas['MachineHealthResponse']>();
  });
});
