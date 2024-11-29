# Retry Handler Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - Promises and async/await
    - Error handling patterns
    - TypeScript generics
    - Timing operations

## Problem Description

Implement a retry handler that can attempt operations multiple times with configurable backoff strategies and conditions. This is essential for building resilient systems that can handle transient failures in distributed environments.

### Function Signature
```typescript
type RetryOptions = {
  maxAttempts: number;
  backoffStrategy: 'fixed' | 'exponential' | 'custom';
  baseDelayMs: number;
  maxDelayMs?: number;
  shouldRetry?: (error: Error) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
};

type RetryResult<T> = {
  result: T;
  attempts: number;
  totalTimeMs: number;
  errors: Error[];
};

async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<RetryResult<T>>;

class RetryHandler {
  constructor(options: RetryOptions);
  
  async execute<T>(operation: () => Promise<T>): Promise<RetryResult<T>>;
  
  getStats(): RetryStats;
}

type RetryStats = {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  averageAttempts: number;
  totalRetries: number;
};
```

### Requirements

1. Basic Retry Functionality:
    - Attempt operation multiple times
    - Support different backoff strategies
    - Track attempt history
    - Return comprehensive result

2. Backoff Strategies:
    - Fixed delay between attempts
    - Exponential backoff with jitter
    - Support custom backoff functions
    - Respect maximum delay

3. Control and Monitoring:
    - Configurable retry conditions
    - Attempt count limiting
    - Progress callbacks
    - Statistics tracking

### Edge Cases to Handle

- Operation timing out
- Maximum retries exceeded
- Invalid backoff parameters
- Network failures
- Partial success states
- Concurrent retries
- Resource cleanup

### Example

```typescript
// Create handler with options
const handler = new RetryHandler({
  maxAttempts: 3,
  backoffStrategy: 'exponential',
  baseDelayMs: 1000,
  maxDelayMs: 10000,
  shouldRetry: (error) => error.code === 'NETWORK_ERROR',
  onRetry: (error, attempt) => {
    console.log(`Retry attempt ${attempt} after error: ${error.message}`);
  }
});

// Use handler
try {
  const result = await handler.execute(async () => {
    const response = await api.fetchData();
    return response.data;
  });
  
  console.log(`Succeeded after ${result.attempts} attempts`);
} catch (error) {
  console.error('All retry attempts failed:', error);
}

// Check statistics
const stats = handler.getStats();
console.log(stats);
// {
//   totalOperations: 1,
//   successfulOperations: 1,
//   failedOperations: 0,
//   averageAttempts: 2,
//   totalRetries: 1
// }
```

## Notes

This exercise tests your ability to:
- Implement retry patterns
- Handle asynchronous operations
- Manage timing and delays
- Track operation statistics
- Handle various failure modes

Consider:
- Resource cleanup between retries
- Memory usage during retries
- Timing accuracy
- Error classification
- Performance implications

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Retry budgets
2. Circuit breaker integration
3. Fallback strategies
4. Retry queues
5. Rate limiting integration
6. Parallel retry attempts
7. Context-aware retries
8. Retry state persistence

## Real-World Applications

This functionality is commonly used in:
- API clients
- Database operations
- Network requests
- File operations
- Message processing
- Service integration
- Job processing
- Distributed systems
