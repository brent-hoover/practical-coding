# Rate Limiter Gateway Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Rate limiting algorithms
    - Distributed systems concepts
    - Gateway patterns

## Problem Description

Implement a rate limiter gateway that can control request rates using various algorithms, track client usage, and enforce rate limits across multiple instances. This is used in API gateways to protect services from overuse and ensure fair resource allocation.

### Function Signature
```typescript
type RateLimitConfig = {
  window: number;          // Time window in ms
  limit: number;           // Max requests per window
  algorithm: 'token' | 'leaky' | 'fixed';
  shared?: boolean;        // Use shared storage
};

type RateLimitKey = {
  clientId: string;
  resource: string;
};

class RateLimiterGateway {
  constructor(options?: {
    storage?: RateLimitStorage;
    errorHandler?: RateLimitErrorHandler;
  });

  // Add rate limit rule
  addRule(
    pattern: string | RegExp,
    config: RateLimitConfig
  ): void;

  // Check rate limit
  checkLimit(
    key: RateLimitKey,
    cost?: number
  ): Promise<RateLimitResult>;

  // Handle request with rate limiting
  handleRequest(req: Request): Promise<Response>;

  // Get rate limit status
  getStatus(key: RateLimitKey): RateLimitStatus;
}

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number;
  retryAfter?: number;
};

type RateLimitStatus = {
  total: number;
  remaining: number;
  reset: number;
  exceeded: boolean;
};
```

### Requirements

1. Rate Limiting:
    - Multiple algorithms
    - Resource patterns
    - Cost accounting
    - Window tracking

2. Client Management:
    - Client identification
    - Usage tracking
    - Quota management
    - Shared state

3. Response Handling:
    - Rate limit headers
    - Error responses
    - Retry guidance
    - Quota updates

### Edge Cases to Handle

- Concurrent requests
- Distributed state
- Clock skew
- Storage failures
- Algorithm edge cases
- Client bursts
- Resource patterns
- Recovery scenarios

### Example

```typescript
// Create gateway
const gateway = new RateLimiterGateway({
  storage: new RedisStorage(),
  errorHandler: customErrorHandler
});

// Add rate limit rules
gateway.addRule('/api/public/*', {
  window: 60000,     // 1 minute
  limit: 60,         // 60 requests per minute
  algorithm: 'token'
});

gateway.addRule('/api/user/*', {
  window: 3600000,   // 1 hour
  limit: 1000,       // 1000 requests per hour
  algorithm: 'leaky',
  shared: true       // Use shared storage
});

// Check specific limit
const result = await gateway.checkLimit({
  clientId: 'client123',
  resource: '/api/public/users'
});

console.log(result);
// {
//   allowed: true,
//   remaining: 59,
//   reset: 1621234567890,
//   retryAfter: undefined
// }

// Handle request with rate limiting
const req = new Request('http://api.example.com/api/public/users', {
  headers: {
    'X-Client-ID': 'client123'
  }
});

const response = await gateway.handleRequest(req);
// Response includes rate limit headers:
// X-RateLimit-Limit: 60
// X-RateLimit-Remaining: 59
// X-RateLimit-Reset: 1621234567890

// Check status
console.log(gateway.getStatus({
  clientId: 'client123',
  resource: '/api/public/users'
}));
// {
//   total: 60,
//   remaining: 59,
//   reset: 1621234567890,
//   exceeded: false
// }
```

## Notes

This exercise tests your ability to:
- Implement rate limiting
- Handle distributed state
- Manage concurrency
- Track usage
- Ensure fairness

Consider:
- Algorithm selection
- Storage strategies
- Error handling
- Header formatting
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Dynamic limits
2. Priority clients
3. Quota borrowing
4. Rate forecasting
5. Custom algorithms
6. Usage analytics
7. Limit delegation
8. Circuit breaking

## Real-World Applications

This functionality is commonly used in:
- API gateways
- Load balancers
- CDNs
- Proxy servers
- Authentication services
- Public APIs
- Microservices
- Cloud platforms
