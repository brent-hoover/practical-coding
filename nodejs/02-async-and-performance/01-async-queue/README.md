# Async Queue Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Promises and async/await
    - Basic error handling

## Problem Description

Implement an asynchronous queue that processes items one at a time using a consumer function. This is a common pattern for handling background tasks, processing events, or managing resource-intensive operations.

### Function Signature
```typescript
class AsyncQueue<T> {
  constructor(
    consumer: (item: T) => Promise<void>,
    options?: {
      maxRetries?: number;
      retryDelay?: number;
    }
  );

  // Add item to the queue
  async enqueue(item: T): Promise<void>;

  // Pause processing (current task will complete)
  pause(): void;

  // Resume processing
  resume(): void;

  // Get current queue status
  getStatus(): QueueStatus;
}

type QueueStatus = {
  size: number;
  active: boolean;
  processing: boolean;
  processed: number;
  failed: number;
};
```

### Requirements

1. Basic Queue Operations:
    - Enqueue items to be processed
    - Process items in FIFO (First In, First Out) order
    - Process one item at a time
    - Wait for item processing to complete before starting next item

2. Queue Control:
    - Ability to pause/resume processing
    - Track queue size and status
    - Maintain processing statistics

3. Error Handling:
    - Handle consumer function errors gracefully
    - Optional retry mechanism for failed items
    - Track failed items count

### Edge Cases to Handle

- Empty queue behavior
- Pause during processing
- Consumer function throwing errors
- Queue full scenarios
- Multiple rapid enqueue operations
- Retry exhaustion

### Example

```typescript
// Create queue with consumer function
const queue = new AsyncQueue(async (item: string) => {
  console.log(`Processing: ${item}`);
  await someAsyncOperation(item);
});

// Add items to queue
await queue.enqueue('item1');
await queue.enqueue('item2');

// Pause processing
queue.pause();

// Check status
const status = queue.getStatus();
console.log(status);
// {
//   size: 1,
//   active: false,
//   processing: false,
//   processed: 1,
//   failed: 0
// }

// Resume processing
queue.resume();
```

## Notes

This exercise tests your ability to:
- Work with asynchronous operations
- Implement queue data structures
- Handle errors in async contexts
- Manage state in an async environment
- Track processing status

Consider:
- Memory usage with large queues
- Error recovery strategies
- State management during pause/resume
- Processing order guarantees
- Consumer function timeout handling

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Priority queueing support
2. Batch processing mode
3. Event emitters for status changes
4. Queue size limits
5. Timeout handling
6. Item cancellation
7. Progress callbacks
8. Dead letter queue for failed items

## Real-World Applications

This functionality is commonly used in:
- Background job processing
- Event handling systems
- Task scheduling
- Resource-intensive operations
- Message queues
- Rate limiting implementations
- Batch processing systems
