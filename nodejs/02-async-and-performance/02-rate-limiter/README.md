# Rate Limiter Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Promises and async/await
    - Basic timing operations

## Problem Description

Implement a rate limiter that controls how many operations can be performed within a time window. This is a common requirement for API clients, resource management, and service protection.

### Function Signature
```typescript
class RateLimiter {
  constructor(
    options: {
      maxRequests: number;    // Maximum requests allowed
      timeWindowMs: number;   // Time window in milliseconds
      strategy?: 'sliding' | 'fixed';  // Window type (default: 'sliding')
    }
  );

  // Attempt to acquire permission to proceed
  async acquire(): Promise<boolean>;

  // Returns time in ms until next available slot
  getTimeUntilAvailable(): number;

  // Get current limiter status
  getStatus(): RateLimiterStatus;
}

type RateLimiterStatus = {
  availableTokens: number;    // Remaining requests allowed
  windowStartTime: number;    // Start of current window
  isLimited: boolean;         // Whether currently rate limited
};
```

### Requirements

1. Basic Rate Limiting:
    - Track number of operations in time window
    - Enforce maximum operations limit
    - Support both sliding and fixed windows
    - Return whether operation is allowed

2. Window Management:
    - Track time window correctly
    - Reset counters when window expires
    - Handle window transitions properly

3. Status Information:
    - Track available operation slots
    - Provide time until next available slot
    - Report current limiter status

### Edge Cases to Handle

- Concurrent acquire requests
- Window boundary transitions
- Clock skew/time changes
- Rapid repeated requests
- Zero token scenarios
- Very short/long time windows

### Example

```typescript
// Create limiter: 5 requests per second
const limiter = new RateLimiter({
  maxRequests: 5,
  timeWindowMs: 1000
});

// Example usage in an API client
async function makeApiRequest() {
  if (await limiter.acquire()) {
    // Proceed with API call
    return api.call();
  } else {
    const waitTime = limiter.getTimeUntilAvailable();
    throw new Error(`Rate limited. Try again in ${waitTime}ms`);
  }
}

// Check current status
const status = limiter.getStatus();
console.log(status);
// {
//   availableTokens: 3,
//   windowStartTime: 1621234567890,
//   isLimited: false
// }
```

## Notes

This exercise tests your ability to:
- Manage time-based operations
- Handle concurrent requests
- Track and update state
- Work with different window strategies
- Provide accurate timing information

Consider:
- Accuracy of timing operations
- Memory usage for tracking requests
- Concurrent request handling
- Window boundary edge cases
- Clock reliability

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Multiple rate limits (e.g., 5/second AND 100/hour)
2. Different bucket types (token bucket, leaky bucket)
3. Priority levels
4. Distributed rate limiting
5. Custom window strategies
6. Request queueing
7. Burst handling
8. Rate limit sharing across instances

## Real-World Applications

This functionality is commonly used in:
- API clients
- Service protection
- Resource management
- Network throttling
- Database query limiting
- User action throttling
- Service mesh rate limiting
- DDoS protection
