export async function measureExecution<T>(fn: () => Promise<T>) {
  const start = performance.now();

  const result = await fn();

  const end = performance.now();
  const duration = Math.round(end - start);

  return { result, duration };
}
