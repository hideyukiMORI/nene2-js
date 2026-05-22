import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fixturesRoot = resolve(process.cwd(), 'tests/fixtures');

export function loadFixture(relPath: string): unknown {
  return JSON.parse(readFileSync(resolve(fixturesRoot, relPath), 'utf8')) as unknown;
}

export function jsonResponse(
  body: unknown,
  status = 200,
  contentType = 'application/json',
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': contentType },
  });
}

export function problemResponse(problem: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(problem), {
    status,
    headers: { 'content-type': 'application/problem+json' },
  });
}

export function sequentialFetch(responses: Response[]): typeof fetch {
  let i = 0;
  const fetchMock: typeof fetch = async () => {
    const res = responses[i];
    i += 1;
    if (res === undefined) {
      throw new Error(`mock fetch exhausted at call ${i}`);
    }
    return res;
  };
  return fetchMock;
}
