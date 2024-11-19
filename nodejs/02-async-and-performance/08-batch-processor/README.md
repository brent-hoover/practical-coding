# Batch Processor Exercise

## Problem Description

Implement an asynchronous batch processor that handles a collection of items, processes them in batches while respecting concurrency limits and processing delays, and handles failures gracefully.

### Function Signature
```typescript
async function processBatch<T>(
  items: T[],
  processor: (item: T) => Promise<void>,
  options: ProcessorOptions
): Promise<BatchResult<T>>
```

### Types
```typescript
type ProcessorOptions = {
  batchSize: number;
  maxConcurrent: number;
  delayMs?: number;
};

type BatchResult<T> = {
  successful: T[];
  failed: Array<{
    item: T;
    error: Error;
  }>;
  totalProcessed: number;
  totalBatches: number;
  processingTimeMs: number;
};
```

### Requirements

The processor should:

1. Basic Processing:
   - Process items in batches of specified size
   - Track successful and failed items
   - Maintain processing order within batches

2. Concurrency Control:
   - Respect maximum concurrent operations limit
   - Process items in parallel up to maxConcurrent limit
   - Track total number of batches processed

3. Rate Limiting:
   - Implement delay between item processing if specified
   - Track total processing time

4. Error Handling:
   - Continue processing despite individual item failures
   - Collect and report failed items with their errors
   - Maintain successful items list

### Example

```typescript
const items = [1, 2, 3, 4, 5];
const processor = async (item: number) => {
  if (item === 3) throw new Error('Failed');
  await someAsyncOperation(item);
};

const result = await processBatch(items, processor, {
  batchSize: 2,
  maxConcurrent: 2,
  delayMs: 100
});

// Result:
{
  successful: [1, 2, 4, 5],
  failed: [{ item: 3, error: Error('Failed') }],
  totalProcessed: 5,
  totalBatches: 3,
  processingTimeMs: 350
}
```

## Notes for Candidates

This exercise tests your ability to:
- Handle asynchronous operations
- Manage concurrency
- Implement rate limiting
- Handle errors gracefully
- Track and report progress

Consider:
- How to handle partial batch failures
- Efficient concurrent processing
- Memory usage for large datasets
- Edge cases around timing and delays

## Getting Started

1. Implement your solution in `index.ts`
2. Run tests using `npm run test`
3. Start with simple cases and progress to more complex scenarios
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
- Progress reporting
- Batch retry logic
- Priority processing
- Adaptive batch sizing
- Timeout handling
- Memory usage optimization

## Real-World Applications

This exercise simulates real-world scenarios like:
- API request batching
- Data ETL processes
- Bulk data processing
- Queue workers
- Rate-limited operations
