# API Gateway Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Service composition
    - Error handling
    - Load balancing concepts

## Problem Description

Implement an API gateway that can route requests to multiple backend services, aggregate responses, and handle cross-cutting concerns. This is used as an entry point for microservices architectures to provide a unified API interface.

### Function Signature
```typescript
type ServiceConfig = {
  name: string;
  endpoints: ServiceEndpoint[];
  healthCheck?: string;
  timeout?: number;
  retries?: number;
};

type ServiceEndpoint = {
  path: string;
  method: string;
  upstream: string[];     // Backend service URLs
  aggregate?: boolean;    // Combine multiple responses
  transform?: ResponseTransform;
};

class ApiGateway {
  constructor(options?: {
    loadBalancer?: LoadBalancingStrategy;
    circuitBreaker?: CircuitBreakerConfig;
  });

  // Register service
  addService(config: ServiceConfig): void;

  // Handle incoming request
  handleRequest(req: Request): Promise<Response>;

  // Get service health
  getServiceHealth(name: string): ServiceHealth;

  // Get gateway metrics
  getMetrics(): GatewayMetrics;
}

type ServiceHealth = {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: number;
  failures: number;
  latency: number;
};

type GatewayMetrics = {
  requests: number;
  errors: number;
  latency: number;
  activeServices: number;
};
```

### Requirements

1. Request Routing:
    - Service discovery
    - Load balancing
    - Request forwarding
    - Response aggregation

2. Service Management:
    - Health checking
    - Circuit breaking
    - Retry handling
    - Timeout management

3. Cross-cutting Concerns:
    - Authentication
    - Rate limiting
    - Logging
    - Monitoring

### Edge Cases to Handle

- Service failures
- Timeout scenarios
- Partial responses
- Circuit breaking
- Invalid configs
- Race conditions
- Memory leaks
- Network errors

### Example

```typescript
// Create gateway
const gateway = new ApiGateway({
  loadBalancer: new RoundRobinStrategy(),
  circuitBreaker: {
    threshold: 5,
    resetTimeout: 30000
  }
});

// Register services
gateway.addService({
  name: 'users',
  endpoints: [
    {
      path: '/users/:id',
      method: 'GET',
      upstream: [
        'http://users-service-1/users/:id',
        'http://users-service-2/users/:id'
      ]
    },
    {
      path: '/users/:id/profile',
      method: 'GET',
      upstream: ['http://profile-service/profiles/:id'],
      aggregate: true,
      transform: async (responses) => {
        const [user, profile] = responses;
        return { ...user, profile };
      }
    }
  ],
  healthCheck: '/health',
  timeout: 5000,
  retries: 3
});

// Handle request
const req = new Request(
  'http://api.example.com/users/123/profile'
);
const response = await gateway.handleRequest(req);

// Check service health
console.log(gateway.getServiceHealth('users'));
// {
//   status: 'healthy',
//   lastCheck: 1621234567890,
//   failures: 0,
//   latency: 45.2
// }

// Get metrics
console.log(gateway.getMetrics());
// {
//   requests: 1,
//   errors: 0,
//   latency: 45.2,
//   activeServices: 1
// }
```

## Notes

This exercise tests your ability to:
- Design service gateways
- Handle distributed systems
- Manage service health
- Implement load balancing
- Handle failures

Consider:
- Service discovery
- Health checking
- Error handling
- Performance monitoring
- Resource management

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Service caching
2. Request transformation
3. Response compression
4. Service versioning
5. Traffic splitting
6. Request tracing
7. Protocol translation
8. Service mocking

## Real-World Applications

This functionality is commonly used in:
- Microservices
- Cloud platforms
- Service mesh
- Edge computing
- API management
- Load balancing
- Service discovery
- Traffic management
