export type ProcessorOptions = {
  batchSize: number;
  maxConcurrent: number;
  delayMs?: number;
};

export type BatchResult<T> = {
  successful: T[];
  failed: Array<{
    item: T;
    error: Error;
  }>;
  totalProcessed: number;
  totalBatches: number;
  processingTimeMs: number;
};

async function measureExecutionTime(func: () => Promise<void>): Promise<number> {
  const start = process.hrtime();
  await func();
  const [seconds, nanoseconds] = process.hrtime(start);
  // Convert to ms
  return seconds * 1000 + nanoseconds / 1e6;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

async function executeAll<T>(
  functions: Array<() => Promise<T>>,
  delay: number
): Promise<Array<{ success: boolean; result?: T; error?: unknown }>> {
  const wrappedFunctions = functions.map(async (fn) => {
    try {
      const result = await fn();
      await sleep(delay);
      return { success: true, result };
    } catch (error) {
      await sleep(delay);
      return { success: false, error };
    }
  });

  return await Promise.all(wrappedFunctions);
}

export async function processBatch<T>(
  items: T[],
  processor: (item: T) => Promise<void>,
  options: ProcessorOptions
): Promise<BatchResult<T>> {
  const results: BatchResult<T> = {
    successful: [],
    failed: [],
    totalProcessed: 0,
    totalBatches: 0,
    processingTimeMs: 0,
  };

  async function process(
    items: T[],
    processor: (item: T) => Promise<void>,
    options: ProcessorOptions
  ): Promise<void> {
    const batchSize = options.batchSize;
    const maxConcurrent = options.maxConcurrent;
    const delayMs = options.delayMs || 0;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      totalBatches++;
      const processItems: T[] = [];
      for (const item of batch) {
        results.totalProcessed++;
        processItems.push(item);
        if (processItems.length >= maxConcurrent || batch.length < maxConcurrent) {
          const processResults = await executeAll(
            processItems.map(
              (item): (() => Promise<void>) =>
                () =>
                  processor(item)
            ),
            delayMs
          );
          processResults.forEach((result, index) => {
            if (result.success) {
              results.successful.push(processItems[index]);
            } else {
              results.failed.push({ item: processItems[index], error: result.error as Error });
            }
          });
          processItems.length = 0;
        }
      }
    }
  }

  let totalBatches = 0;
  results.processingTimeMs = await measureExecutionTime(() => process(items, processor, options));
  results.totalBatches = totalBatches;
  return results;
}
