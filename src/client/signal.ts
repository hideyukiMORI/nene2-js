/**
 * Per-request AbortSignal: user `signal` plus optional `timeoutMs` (AbortSignal.timeout).
 * @internal
 */
export function mergeRequestSignal(
  userSignal: AbortSignal | undefined,
  timeoutMs: number | undefined,
): AbortSignal | undefined {
  const parts: AbortSignal[] = [];
  if (userSignal !== undefined) {
    parts.push(userSignal);
  }
  if (timeoutMs !== undefined) {
    if (timeoutMs <= 0) {
      throw new Error('Nene2ClientConfig.timeoutMs must be positive');
    }
    parts.push(AbortSignal.timeout(timeoutMs));
  }
  if (parts.length === 0) {
    return undefined;
  }
  if (parts.length === 1) {
    return parts[0];
  }

  const controller = new AbortController();
  const abortFromParts = (): void => {
    controller.abort();
  };

  for (const part of parts) {
    if (part.aborted) {
      abortFromParts();
      return controller.signal;
    }
    part.addEventListener('abort', abortFromParts, { once: true });
  }

  return controller.signal;
}
