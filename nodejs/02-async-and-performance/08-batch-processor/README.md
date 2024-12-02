# Batch Processor Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
   - Advanced async patterns
   - Concurrency control
   - TypeScript generics
   - Progress tracking
   - Error handling strategies

## Problem Description

Implement an asynchronous batch processor that handles a collection of items, processes them in batches while respecting concurrency limits and processing delays, and handles failures gracefully. This is commonly used in ETL processes, bulk operations, and data processing pipelines.

### Function Signature
```typescript
type ProcessorOptions = {
  batchSize: number;         // Items per batch
  maxConcurrent: number;     // Max concurrent batches
  delayMs?: number;          // Delay between items
  timeoutMs?: number;        // Max processing time per item
  retries?: number;          // Retries per failed item
  onProgress?: (progress: ProcessorProgress) => void;
};

type ProcessorProgress = {
  processed: number;         // Total items processed
  successful: number;        // Successfully processed
  failed: number;           // Failed items
  pending: number;          // Remaining items
  currentBatch: number;     // Current batch number
  totalBatches: number;     // Total number of batches
};

type BatchResult<T> = {
  successful: T[];          // Successfully processed items
  failed: Array<{          // Failed items with errors
    item: T;
    error: Error;
    attempts: number;
  }>;
  totalProcessed: number;   // Total items processed
  totalBatches: number;     // Total batches processed
  processingTimeMs: number; // Total processing time
};

async function processBatch<T>(
  items: T[],
  processor: (item: T) => Promise<void>,
  options: ProcessorOptions
): Promise<BatchResult<T>>;
```

### Requirements

1. Batch Processing:
   - Process items in configured batch sizes
   - Respect maximum concurrent operations
   - Implement delay between operations
   - Track processing progress

2. Error Handling:
   - Handle individual item failures
   - Support retry logic
   - Continue processing despite errors
   - Track failed items with errors

3. Control & Monitoring:
   - Progress updates
   - Timeout handling
   - Batch statistics
   - Processing time tracking

### Edge Cases to Handle

- Empty batch handling
- Partial batch failures
- Timeout scenarios
- Memory pressure
- Progress calculation
- Retry exhaustion
- Concurrent batch limits
- Resource cleanup

### Example

```typescript
const items = [1, 2, 3, 4, 5];
const processor = async (item: number) => {
  if (item === 3) throw new Error('Processing failed');
  await someAsyncOperation(item);
};

const result = await processBatch(items, processor, {
  batchSize: 2,
  maxConcurrent: 2,
  delayMs: 100,
  timeoutMs: 5000,
  retries: 2,
  onProgress: (progress) => {
    console.log(`Processed ${progress.processed}/${progress.processed + progress.pending} items`);
  }
});

// Result:
{
  successful: [1, 2, 4, 5],
  failed: [{
    item: 3,
    error: Error('Processing failed'),
    attempts: 3
  }],
  totalProcessed: 5,
  totalBatches: 3,
  processingTimeMs: 350
}
```

## Notes

This exercise tests your ability to:
- Handle complex async operations
- Manage concurrency
- Implement retry logic
- Track progress accurately
- Handle errors gracefully

Consider:
- Memory usage with large batches
- Error propagation
- Progress calculation accuracy
- Resource management
- Performance optimization

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Priority processing
2. Adaptive batch sizing
3. Pause/resume functionality
4. Resource throttling
5. Advanced retry strategies
6. Batch preprocessing
7. Result aggregation
8. Realtime monitoring

## Real-World Applications

This functionality is commonly used in:
- Data ETL processes
- API bulk operations
- Email sending
- File processing
- Database migrations
- Report generation
- Media processing
- Data synchronization
