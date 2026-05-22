import { resolveConfig, type Nene2ClientConfig } from './config.js';
import { withQuery } from './path.js';
import { deleteNoContent, getJson, postJson, putJson } from './request.js';
import {
  isExampleNoteListResponse,
  isExampleNoteResponse,
  isProtectedResponse,
  isExampleTagListResponse,
  isExampleTagResponse,
  type CreateNoteRequest,
  type CreateTagRequest,
  type ExampleTag,
  type ExampleTagListResponse,
  type ListTagsParams,
  type ExampleNote,
  type ExampleNoteListResponse,
  type ListNotesParams,
  type ProtectedResponse,
} from '../types/examples/index.js';
import {
  isExamplePingResponse,
  isFrameworkSmokeResponse,
  isHealthResponse,
  isMachineHealthResponse,
  type ExamplePingResponse,
  type FrameworkSmokeResponse,
  type HealthResponse,
  type MachineHealthResponse,
  type SmokeCheckResult,
} from '../types/system.js';

export type HealthOptions = {
  /**
   * When true, HTTP 503 with a valid {@link HealthResponse} body (`status: degraded`) is returned instead of throwing.
   * Matches OpenAPI `getHealth` degraded response.
   */
  readonly allowDegraded?: boolean;
};

/**
 * Typed NENE2 HTTP client (Phase 2 surface).
 */
export interface Nene2Client {
  /**
   * `GET /` — framework smoke (OpenAPI `getFrameworkSmoke`).
   */
  frameworkSmoke(): Promise<FrameworkSmokeResponse>;

  /**
   * `GET /health` — operational health (OpenAPI `getHealth`).
   * By default, non-2xx (including 503 degraded) throws {@link Nene2ClientError}.
   */
  health(options?: HealthOptions): Promise<HealthResponse>;

  /**
   * `GET /machine/health` — API-key protected health (OpenAPI `getMachineHealth`). Requires `apiKey`.
   */
  machineHealth(): Promise<MachineHealthResponse>;

  /**
   * `GET /examples/ping` — example scaffold ping (OpenAPI `getExamplePing`).
   */
  ping(): Promise<ExamplePingResponse>;

  /**
   * Parallel `health()` + `ping()` for dashboards (FT2 Persona B: single smoke helper).
   */
  smoke(): Promise<SmokeCheckResult>;

  /**
   * `GET /examples/notes` — paginated list (OpenAPI `listExampleNotes`).
   */
  listNotes(params?: ListNotesParams): Promise<ExampleNoteListResponse>;

  /**
   * `GET /examples/notes/{id}` — single note (OpenAPI `getExampleNoteById`).
   */
  getNote(id: number): Promise<ExampleNote>;

  /**
   * `POST /examples/notes` — create note (OpenAPI `createExampleNote`).
   */
  createNote(body: CreateNoteRequest): Promise<ExampleNote>;

  /**
   * `PUT /examples/notes/{id}` — update note (OpenAPI `updateExampleNoteById`).
   */
  updateNote(id: number, body: CreateNoteRequest): Promise<ExampleNote>;

  /**
   * `DELETE /examples/notes/{id}` — delete note (OpenAPI `deleteExampleNoteById`, 204).
   */
  deleteNote(id: number): Promise<void>;

  /**
   * `GET /examples/tags` — paginated list (OpenAPI `listExampleTags`).
   */
  listTags(params?: ListTagsParams): Promise<ExampleTagListResponse>;

  /**
   * `GET /examples/tags/{id}` — single tag (OpenAPI `getExampleTagById`).
   */
  getTag(id: number): Promise<ExampleTag>;

  /**
   * `POST /examples/tags` — create tag (OpenAPI `createExampleTag`).
   */
  createTag(body: CreateTagRequest): Promise<ExampleTag>;

  /**
   * `PUT /examples/tags/{id}` — update tag (OpenAPI `updateExampleTagById`).
   */
  updateTag(id: number, body: CreateTagRequest): Promise<ExampleTag>;

  /**
   * `DELETE /examples/tags/{id}` — delete tag (OpenAPI `deleteExampleTagById`, 204).
   */
  deleteTag(id: number): Promise<void>;

  /**
   * `GET /examples/protected` — JWT claims demo (OpenAPI `getProtected`). Requires `bearer` in config.
   */
  getProtected(): Promise<ProtectedResponse>;
}

/**
 * Create a typed client for documented NENE2 system endpoints.
 *
 * @example
 * ```ts
 * const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
 * const health = await client.health();
 * const notes = await client.listNotes({ limit: 10 });
 * ```
 */
export function createNene2Client(config: Nene2ClientConfig): Nene2Client {
  const resolved = resolveConfig(config);

  return {
    frameworkSmoke: () => getJson(resolved, '/', isFrameworkSmokeResponse),
    health: (options) => {
      if (options?.allowDegraded) {
        return getJson(resolved, '/health', isHealthResponse, { alsoOkStatuses: [503] });
      }
      return getJson(resolved, '/health', isHealthResponse);
    },
    machineHealth: () => getJson(resolved, '/machine/health', isMachineHealthResponse),
    ping: () => getJson(resolved, '/examples/ping', isExamplePingResponse),
    smoke: async () => {
      const [health, ping] = await Promise.all([
        getJson(resolved, '/health', isHealthResponse),
        getJson(resolved, '/examples/ping', isExamplePingResponse),
      ]);
      return { health, ping };
    },
    listNotes: (params) =>
      getJson(
        resolved,
        withQuery('/examples/notes', {
          limit: params?.limit,
          offset: params?.offset,
        }),
        isExampleNoteListResponse,
      ),
    getNote: (id) => getJson(resolved, `/examples/notes/${String(id)}`, isExampleNoteResponse),
    createNote: (body) => postJson(resolved, '/examples/notes', body, isExampleNoteResponse),
    updateNote: (id, body) =>
      putJson(resolved, `/examples/notes/${String(id)}`, body, isExampleNoteResponse),
    deleteNote: (id) => deleteNoContent(resolved, `/examples/notes/${String(id)}`),
    listTags: (params) =>
      getJson(
        resolved,
        withQuery('/examples/tags', {
          limit: params?.limit,
          offset: params?.offset,
        }),
        isExampleTagListResponse,
      ),
    getTag: (id) => getJson(resolved, `/examples/tags/${String(id)}`, isExampleTagResponse),
    createTag: (body) => postJson(resolved, '/examples/tags', body, isExampleTagResponse),
    updateTag: (id, body) =>
      putJson(resolved, `/examples/tags/${String(id)}`, body, isExampleTagResponse),
    deleteTag: (id) => deleteNoContent(resolved, `/examples/tags/${String(id)}`),
    getProtected: () => getJson(resolved, '/examples/protected', isProtectedResponse),
  };
}
