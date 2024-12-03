import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AsyncQueue } from './index.js';

describe('AsyncQueue', () => {
  let queue: AsyncQueue<string>;
  let mockConsumer: (item: string) => Promise<void>;

  beforeEach(() => {
    mockConsumer = vi.fn().mockResolvedValue(undefined);
    queue = new AsyncQueue(mockConsumer);
  });

  it('should process items in FIFO order', async () => {
    await queue.enqueue('item1');
    await queue.enqueue('item2');

    expect(mockConsumer).toHaveBeenNthCalledWith(1, 'item1');
    expect(mockConsumer).toHaveBeenNthCalledWith(2, 'item2');
  });

  it('should process one item at a time', async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    mockConsumer = vi.fn().mockImplementation(async () => {
      await delay(100);
    });
    queue = new AsyncQueue(mockConsumer);

    const enqueuePromise1 = queue.enqueue('item1');
    const enqueuePromise2 = queue.enqueue('item2');

    await delay(50);
    expect(mockConsumer).toHaveBeenCalledTimes(1);

    await enqueuePromise1;
    await enqueuePromise2;
    expect(mockConsumer).toHaveBeenCalledTimes(2);
  });

  it('should pause and resume processing', async () => {
    const processingPromise = queue.enqueue('item1');
    queue.pause();
    await queue.enqueue('item2');

    expect(mockConsumer).toHaveBeenCalledTimes(1);
    expect(queue.getStatus().active).toBe(false);

    queue.resume();
    await processingPromise;

    expect(mockConsumer).toHaveBeenCalledTimes(2);
    expect(queue.getStatus().active).toBe(true);
  });

  it('should handle consumer function errors', async () => {
    mockConsumer = vi.fn()
      .mockRejectedValueOnce(new Error('Processing failed'))
      .mockResolvedValueOnce(undefined);
    queue = new AsyncQueue(mockConsumer, { maxRetries: 1 });

    await queue.enqueue('item1');

    expect(mockConsumer).toHaveBeenCalledTimes(2);
    expect(queue.getStatus().failed).toBe(0);
  });

  it('should update queue status correctly', async () => {
    await queue.enqueue('item1');
    await queue.enqueue('item2');

    const status = queue.getStatus();
    expect(status).toEqual({
      size: 0,
      active: true,
      processing: false,
      processed: 2,
      failed: 0,
    });
  });

  it('should handle empty queue behavior', async () => {
    const status = queue.getStatus();
    expect(status.size).toBe(0);
    expect(status.processing).toBe(false);
  });

  it('should handle multiple rapid enqueue operations', async () => {
    const enqueuePromises = [];
    for (let i = 0; i < 100; i++) {
      enqueuePromises.push(queue.enqueue(`item${i}`));
    }
    await Promise.all(enqueuePromises);

    expect(mockConsumer).toHaveBeenCalledTimes(100);
  });
});
