import { describe, it, expect, vi } from 'vitest';
import { processBatch, type ProcessorOptions } from './index.js';

describe('processBatch', () => {
  it('should handle empty array', async () => {
    const processor = vi.fn<[number], Promise<void>>();
    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 1,
    };

    const result = await processBatch<number>([], processor, options);

    expect(result).toMatchObject({
      successful: [],
      failed: [],
      totalProcessed: 0,
      totalBatches: 0,
    });
    expect(typeof result.processingTimeMs).toBe('number');
    expect(result.processingTimeMs).toBeGreaterThan(0);
    expect(processor).not.toHaveBeenCalled();
  });

  it('should process single item', async () => {
    const processor = vi.fn<[number], Promise<void>>().mockResolvedValue(undefined);
    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 1,
    };

    const result = await processBatch<number>([1], processor, options);

    expect(result.successful).toEqual([1]);
    expect(result.failed).toEqual([]);
    expect(result.totalProcessed).toBe(1);
    expect(result.totalBatches).toBe(1);
    expect(processor).toHaveBeenCalledTimes(1);
  });

  it('should process items in correct batch sizes', async () => {
    const processor = vi.fn<[number], Promise<void>>().mockResolvedValue(undefined);
    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 1,
    };

    const result = await processBatch<number>([1, 2, 3, 4, 5], processor, options);

    expect(result.totalProcessed).toBe(5);
    expect(result.totalBatches).toBe(3); // 2 full batches + 1 partial
    expect(result.successful).toEqual([1, 2, 3, 4, 5]);
    expect(processor).toHaveBeenCalledTimes(5);
  });

  it('should handle failed items', async () => {
    const processor = vi
      .fn<[number], Promise<void>>()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('Failed'))
      .mockResolvedValueOnce(undefined);

    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 1,
    };

    const result = await processBatch<number>([1, 2, 3], processor, options);

    expect(result.successful).toEqual([1, 3]);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0].item).toBe(2);
    expect(result.failed[0].error).toBeInstanceOf(Error);
    expect(result.failed[0].error.message).toBe('Failed');
    expect(result.totalProcessed).toBe(3);
  });

  it('should respect maxConcurrent limit', async () => {
    const inProgress = new Set<number>();
    const processor = vi.fn<[number], Promise<void>>().mockImplementation(async (num: number) => {
      inProgress.add(num);
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(inProgress.size).toBeLessThanOrEqual(2); // Should never exceed maxConcurrent
      inProgress.delete(num);
    });

    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 2,
    };

    const result = await processBatch<number>([1, 2, 3, 4, 5], processor, options);
    expect(result.totalProcessed).toBe(5);
  });

  it('should respect delay between items', async () => {
    const processor = vi.fn<[number], Promise<void>>().mockResolvedValue(undefined);
    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 1,
      delayMs: 100,
    };

    const startTime = Date.now();
    await processBatch<number>([1, 2, 3], processor, options);
    const duration = Date.now() - startTime;

    // Should take at least 200ms (2 delays between 3 items)
    expect(duration).toBeGreaterThanOrEqual(200);
  });

  it('should handle mix of success, failure and delays', async () => {
    const processor = vi.fn<[number], Promise<void>>().mockImplementation(async (num: number) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (num % 2 === 0) {
        throw new Error(`Failed ${num}`);
      }
    });

    const options: ProcessorOptions = {
      batchSize: 2,
      maxConcurrent: 2,
      delayMs: 50,
    };

    const result = await processBatch<number>([1, 2, 3, 4, 5], processor, options);

    expect(result.successful).toEqual([1, 3, 5]);
    expect(result.failed).toHaveLength(2);
    expect(result.failed.map((f) => f.item)).toEqual([2, 4]);
  });
});
