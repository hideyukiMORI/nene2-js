import { describe, expectTypeOf, it } from 'vitest';
import type { components, paths } from '../../src/generated/openapi.js';
import type { OpenApiPaths, OpenApiSchemas } from '../../src/types/schemas.js';
import type { ProblemDetails, ValidationProblemDetails } from '../../src/problem/types.js';
import type {
  CreateNoteRequest,
  CreateTagRequest,
  ExampleNote,
  ExampleNoteListResponse,
  ExampleTag,
  ExampleTagListResponse,
  ProtectedResponse,
} from '../../src/types/schemas.js';
import type {
  ExamplePingResponse,
  FrameworkSmokeResponse,
  HealthResponse,
  MachineHealthResponse,
} from '../../src/types/system.js';

type Schemas = components['schemas'];

describe('generated OpenAPI exports', () => {
  it('OpenApiPaths and OpenApiSchemas aliases', () => {
    expectTypeOf<OpenApiSchemas>().toEqualTypeOf<components['schemas']>();
    expectTypeOf<OpenApiPaths>().toEqualTypeOf<paths>();
  });
});

describe('generated OpenAPI schemas vs exported types', () => {
  it('system schemas', () => {
    expectTypeOf<HealthResponse>().toEqualTypeOf<Schemas['HealthResponse']>();
    expectTypeOf<ExamplePingResponse>().toEqualTypeOf<Schemas['ExamplePingResponse']>();
    expectTypeOf<FrameworkSmokeResponse>().toEqualTypeOf<Schemas['FrameworkSmokeResponse']>();
    expectTypeOf<MachineHealthResponse>().toEqualTypeOf<Schemas['MachineHealthResponse']>();
  });

  it('example schemas', () => {
    expectTypeOf<ExampleNote>().toEqualTypeOf<Schemas['ExampleNoteResponse']>();
    expectTypeOf<ExampleNoteListResponse>().toEqualTypeOf<Schemas['ExampleNoteListResponse']>();
    expectTypeOf<CreateNoteRequest>().toEqualTypeOf<Schemas['CreateNoteRequest']>();
    expectTypeOf<ExampleTag>().toEqualTypeOf<Schemas['ExampleTagResponse']>();
    expectTypeOf<ExampleTagListResponse>().toEqualTypeOf<Schemas['ExampleTagListResponse']>();
    expectTypeOf<CreateTagRequest>().toEqualTypeOf<Schemas['CreateTagRequest']>();
    expectTypeOf<ProtectedResponse>().toEqualTypeOf<Schemas['ProtectedResponse']>();
  });

  it('problem schemas', () => {
    expectTypeOf<ProblemDetails>().toEqualTypeOf<Schemas['ProblemDetails']>();
    expectTypeOf<ValidationProblemDetails>().toEqualTypeOf<Schemas['ValidationProblemDetails']>();
  });
});
