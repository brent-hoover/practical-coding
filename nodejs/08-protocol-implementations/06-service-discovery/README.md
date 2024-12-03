# Service Discovery Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Distributed systems
    - Health checking
    - Load balancing

## Problem Description

Implement a service discovery system that can register services, track health status, and manage service lookup. This is used in distributed systems to enable dynamic service location and load balancing.

### Function Signature
```typescript
type ServiceDefinition = {
  name: string;
  version: string;
  endpoints: string[];
  metadata?: Record<string, unknown>;
  healthCheck?: HealthCheckConfig;
};

type HealthCheckConfig = {
  path?: string;
  interval: number;
  timeout: number;
  threshold: number;
};

class ServiceDiscovery {
  constructor(options?: {
    storage?: DiscoveryStorage;
    loadBalancer?: LoadBalancer;
  });

  // Register service
  register(service: ServiceDefinition): Promise<void>;

  // Deregister service
  deregister(name: string, instance: string): Promise<void>;

  // Find service instances
  find(name: string): Promise<ServiceInstance[]>;

  // Get service health
  getHealth(name: string): ServiceHealth[];

  // Get discovery metrics
  getMetrics(): DiscoveryMetrics;
}

type ServiceInstance = {
  id: string;
  address: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  lastCheck: number;
};

type DiscoveryMetrics = {
  services: number;
  instances: number;
  healthChecks: number;
  failures: number;
};
```

### Requirements

1. Service Management:
    - Service registration
    - Instance tracking
    - Metadata storage
    - Version management

2. Health Checking:
    - Regular checks
    - Status tracking
    - Failure detection
    - Recovery handling

3. Service Location:
    - Instance lookup
    - Load balancing
    - Filtering
    - Caching

### Edge Cases to Handle

- Network partitions
- Health check failures
- Stale registrations
- Version conflicts
- Race conditions
- Split brain
- Cache invalidation
- Failover scenarios

### Example

```typescript
// Create discovery service
const discovery = new ServiceDiscovery({
  storage: new RedisStorage(),
  loadBalancer: new RoundRobinBalancer()
});

// Register service
await discovery.register({
  name: 'user-service',
  version: '1.0.0',
  endpoints: [
    'http://host1:3000/user-service',
    'http://host2:3000/user-service'
  ],
  healthCheck: {
    path: '/health',
    interval: 30000,
    timeout: 5000,
    threshold: 3
  }
});

// Find service instances
const instances = await discovery.find('user-service');
console.log(instances);
// [
//   {
//     id: 'user-service-1',
//     address: 'http://host1:3000/user-service',
//     status: 'healthy',
//     lastCheck: 1621234567890
//   },
//   {
//     id: 'user-service-2',
//     address: 'http://host2:3000/user-service',
//     status: 'healthy',
//     lastCheck: 1621234567890
//   }
// ]

// Check health status
const health = await discovery.getHealth('user-service');

// Get metrics
console.log(discovery.getMetrics());
// {
//   services: 1,
//   instances: 2,
//   healthChecks: 10,
//   failures: 0
// }
```

## Notes

This exercise tests your ability to:
- Handle distributed state
- Implement health checking
- Manage service registry
- Handle failures
- Balance load

Consider:
- Consistency models
- Failure detection
- Cache strategies
- Network partitions
- Scale implications

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Service mesh integration
2. DNS integration
3. Configuration sync
4. Service groups
5. Dependency tracking
6. Event notifications
7. Auto-scaling
8. Fault injection

## Real-World Applications

This functionality is commonly used in:
- Microservices
- Cloud platforms
- Container orchestration
- Service mesh
- API gateways
- Load balancers
- Cloud-native apps
- Distributed systems
