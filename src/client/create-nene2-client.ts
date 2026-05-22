import { resolveConfig, type Nene2ClientConfig } from './config.js';
import { getJson } from './request.js';
import {
  isExamplePingResponse,
  isHealthResponse,
  type ExamplePingResponse,
  type HealthResponse,
} from '../types/system.js';

/**
 * Typed NENE2 HTTP client (minimal Phase 2 surface).
 */
export interface Nene2Client {
  /**
   * `GET /health` — operational health (OpenAPI `getHealth`).
   * May return 503 with a degraded body; that still throws {@link Nene2ClientError}.
   */
  health(): Promise<HealthResponse>;

  /**
   * `GET /examples/ping` — example scaffold ping (OpenAPI `getExamplePing`).
   */
  ping(): Promise<ExamplePingResponse>;
}

/**
 * Create a typed client for documented NENE2 system endpoints.
 *
 * @example
 * ```ts
 * const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
 * const health = await client.health();
 * const pong = await client.ping();
 * ```
 */
export function createNene2Client(config: Nene2ClientConfig): Nene2Client {
  const resolved = resolveConfig(config);

  return {
    health: () => getJson(resolved, '/health', isHealthResponse),
    ping: () => getJson(resolved, '/examples/ping', isExamplePingResponse),
  };
}
