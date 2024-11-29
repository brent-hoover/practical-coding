# Request Batcher Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced async patterns
    - TypeScript generics
    - Promise handling
    - Performance optimization

## Problem Description

Implement a request batcher that can combine multiple similar requests into batch operations, optimizing performance while maintaining individual request context and error handling. This is commonly used in APIs, databases, and messaging systems to reduce network calls and improve throughput.

### Function Signature
```typescript
type BatchOptions<T, R> = {
  maxBatchSize: number;     // Maximum items in a batch
  maxDelayMs: number;       // Maximum wait time before processing
  batchHandler: (items: T[]) => Promise<R[]>;
  keyGenerator?: (item: T) => string;  // Group similar requests
  errorHandler?: (error: Error, items: T[]) => void;
};

class RequestBatcher<T, R> {
  constructor(options: BatchOptions<T, R>);

  // Add item to batch
  async add(item: T): Promise<R>;

  // Force process current batch
  flush(): Promise<void>;

  // Get current batcher status
  getStatus(): BatcherStatus;
}

type BatcherStatus = {
  pending: number;          // Items waiting to be processed
  processing: number;       // Items currently processing
  processed: number;        // Total items processed
  batches: number;         // Total batches processed
  averageBatchSize: number;
  lastBatchTime: number;
};
```

### Requirements

1. Batch Processing:
    - Collect individual requests into batches
    - Process batches based on size or delay
    - Maintain request order within batches
    - Handle partial batch successes

2. Performance Optimization:
    - Minimize unnecessary batches
    - Balance batch size and delay
    - Handle concurrent requests
    - Support request grouping

3. Error Handling:
    - Individual request errors
    - Batch-level errors
    - Error propagation
    - Retry strategies

### Edge Cases to Handle

- Batch handler failures
- Mixed success/failure in batch
- Timeout during processing
- Request cancellation
- Memory pressure
- Order preservation
- Concurrent flushes
- Queue overflow

### Example

```typescript
// Create batcher for API calls
const batcher = new RequestBatcher<User, ApiResponse>({
  maxBatchSize: 100,
  maxDelayMs: 50,
  async batchHandler(users) {
    // Single API call for multiple users
    return api.bulkCreateUsers(users);
  }
});

// Individual requests
try {
  // These will be batched together
  const result1 = await batcher.add(user1);
  const result2 = await batcher.add(user2);
  const result3 = await batcher.add(user3);
} catch (error) {
  console.error('Request failed:', error);
}

// Check status
console.log(batcher.getStatus());
// {
//   pending: 0,
//   processing: 3,
//   processed: 0,
//   batches: 0,
//   averageBatchSize: 0,
//   lastBatchTime: 0
// }

// Force process remaining items
await batcher.flush();
```

## Notes

This exercise tests your ability to:
- Optimize performance through batching
- Handle complex async patterns
- Manage concurrent operations
- Balance competing constraints
- Handle partial failures

Consider:
- Memory usage patterns
- Timing accuracy
- Error handling strategies
- Performance implications
- Resource management

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Priority batching
2. Smart batch sizing
3. Request deduplication
4. Circuit breaker pattern
5. Batch splitting
6. Request timeout handling
7. Batch compression
8. Real-time metrics

## Real-World Applications

This functionality is commonly used in:
- API optimization
- Database operations
- Message queues
- Event processing
- Analytics collection
- Log aggregation
- Bulk operations
- Cache updates
