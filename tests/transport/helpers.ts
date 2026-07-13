import { vi } from 'vitest';

export interface RecordedCall {
  readonly url: string;
  readonly init: RequestInit;
}

export interface FetchRecorder {
  readonly fetch: typeof fetch;
  readonly calls: RecordedCall[];
}

/** Fetch stub that records every call and answers from a queue (last response repeats). */
export function recordingFetch(...responses: Response[]): FetchRecorder {
  const calls: RecordedCall[] = [];
  const queue = [...responses];
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    calls.push({ url, init: init ?? {} });
    const next = queue.length > 1 ? queue.shift() : queue[0];
    if (next === undefined) {
      throw new Error('recordingFetch: no response queued');
    }
    // Hand out clones: Response bodies are single-use, and the last queued
    // response repeats for any further calls.
    return Promise.resolve(next.clone());
  });
  return { fetch: fetchMock, calls };
}

export function jsonResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export function problemResponse(
  status: number,
  problem: Record<string, unknown>,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(problem), {
    status,
    headers: { 'Content-Type': 'application/problem+json', ...headers },
  });
}

/** Minimal in-memory `Storage` for token-store tests. */
export function createFakeStorage(): Storage & { readonly data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    get length(): number {
      return data.size;
    },
    clear(): void {
      data.clear();
    },
    getItem(key: string): string | null {
      return data.get(key) ?? null;
    },
    key(index: number): string | null {
      return [...data.keys()][index] ?? null;
    },
    removeItem(key: string): void {
      data.delete(key);
    },
    setItem(key: string, value: string): void {
      data.set(key, value);
    },
  };
}

/** `Storage` whose every access throws (privacy mode / blocked cookies). */
export function createThrowingStorage(): Storage {
  const boom = (): never => {
    throw new Error('storage access denied');
  };
  return {
    length: 0,
    clear: boom,
    getItem: boom,
    key: boom,
    removeItem: boom,
    setItem: boom,
  };
}
