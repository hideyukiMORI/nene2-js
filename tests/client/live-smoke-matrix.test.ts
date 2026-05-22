import { describe, expect, it } from 'vitest';
import { createNene2Client, Nene2ClientError } from '../../src/index.js';

/** Backend under test (OpenAPI contract: NENE2 canonical; ports are local conventions). */
const BACKENDS = [
  {
    id: 'nene2',
    label: 'NENE2 (PHP)',
    env: 'NENE2_JS_API_BASE_URL',
    role: 'canonical' as const,
  },
  {
    id: 'nene2-python',
    label: 'nene2-python',
    env: 'NENE2_JS_PYTHON_BASE_URL',
    role: 'parity' as const,
  },
  {
    id: 'nene2-node',
    label: 'nene2-node',
    env: 'NENE2_JS_NODE_BASE_URL',
    role: 'parity' as const,
  },
] as const;

type ProbeOutcome = {
  readonly health: 'ok' | 'failed';
  readonly ping: 'ok' | 'failed';
  readonly listNotes: 'ok' | 'skipped' | 'failed';
  readonly notes: string[];
};

async function probeBackend(baseUrl: string): Promise<ProbeOutcome> {
  const client = createNene2Client({ baseUrl });
  const notes: string[] = [];
  let health: ProbeOutcome['health'] = 'failed';
  let ping: ProbeOutcome['ping'] = 'failed';
  let listNotes: ProbeOutcome['listNotes'] = 'skipped';

  try {
    const body = await client.health();
    health = 'ok';
    if (body.service !== 'NENE2') {
      notes.push(`health: unexpected service field "${body.service}"`);
    }
  } catch (err) {
    notes.push(
      `health: ${err instanceof Nene2ClientError ? `${err.status} ${err.message}` : String(err)}`,
    );
  }

  try {
    const body = await client.ping();
    ping = 'ok';
    if (body.message !== 'pong' || body.status !== 'ok') {
      notes.push(`ping: unexpected body ${JSON.stringify(body)}`);
    }
  } catch (err) {
    notes.push(
      `ping: ${err instanceof Nene2ClientError ? `${err.status} ${err.message}` : String(err)}`,
    );
  }

  try {
    const list = await client.listNotes({ limit: 1 });
    listNotes = 'ok';
    if (!Array.isArray(list.items)) {
      notes.push('listNotes: missing items array');
      listNotes = 'failed';
    }
  } catch (err) {
    listNotes = 'failed';
    notes.push(
      `listNotes: ${err instanceof Nene2ClientError ? `${err.status} ${err.message}` : String(err)}`,
    );
  }

  return { health, ping, listNotes, notes };
}

for (const backend of BACKENDS) {
  const baseUrl = process.env[backend.env];

  describe.skipIf(!baseUrl)(`live smoke matrix: ${backend.label}`, () => {
    it(`probes health + ping (${backend.role}, ${backend.env})`, async () => {
      const outcome = await probeBackend(baseUrl!);

      if (backend.role === 'canonical') {
        expect(outcome.health, outcome.notes.join('; ')).toBe('ok');
        expect(outcome.ping, outcome.notes.join('; ')).toBe('ok');
        expect(outcome.listNotes, outcome.notes.join('; ')).toBe('ok');
        const client = createNene2Client({ baseUrl: baseUrl! });
        const health = await client.health();
        expect(health.service).toBe('NENE2');
        const pong = await client.ping();
        expect(pong.message).toBe('pong');
        return;
      }

      // Parity: env was set intentionally — surface drift, do not hide failures
      if (outcome.health !== 'ok' || outcome.ping !== 'ok' || outcome.listNotes === 'failed') {
        console.info(
          `[${backend.id}] compatibility probe: health=${outcome.health} ping=${outcome.ping} listNotes=${outcome.listNotes}`,
          outcome.notes,
        );
      }
      expect(
        { health: outcome.health, ping: outcome.ping, listNotes: outcome.listNotes },
        `OpenAPI contract mismatch — record in docs/field-trials/ and track in ${backend.label}: ${outcome.notes.join('; ')}`,
      ).toEqual({ health: 'ok', ping: 'ok', listNotes: 'ok' });
    });
  });
}

describe('live smoke matrix (documentation)', () => {
  it('lists backends with no URL configured (skipped)', () => {
    const configured = BACKENDS.filter((b) => process.env[b.env]).map((b) => b.id);
    const skipped = BACKENDS.filter((b) => !process.env[b.env]).map((b) => b.id);
    expect(BACKENDS.length).toBe(3);
    if (configured.length === 0) {
      expect(skipped).toEqual(['nene2', 'nene2-python', 'nene2-node']);
    }
  });
});
