# Resource Pool Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced async patterns
    - Connection management
    - TypeScript generics
    - Error handling strategies

## Problem Description

Implement a resource pool that manages a set of reusable resources (like database connections, HTTP clients, or worker threads). The pool should handle resource lifecycle, health checks, and efficient allocation while preventing leaks and ensuring optimal resource utilization.

### Function Signature
```typescript
type PoolOptions<T> = {
  minSize: number;           // Minimum pool size
  maxSize: number;           // Maximum pool size
  acquireTimeoutMs: number;  // Max wait time for resource
  idleTimeoutMs: number;     // Max idle time before cleanup
  factory: {
    create: () => Promise<T>;
    destroy: (resource: T) => Promise<void>;
    validate: (resource: T) => Promise<boolean>;
  };
};

class ResourcePool<T> {
  constructor(options: PoolOptions<T>);

  // Get resource from pool
  async acquire(): Promise<T>;

  // Return resource to pool
  async release(resource: T): Promise<void>;

  // Force cleanup of idle resources
  async cleanUp(): Promise<void>;

  // Get current pool status
  getStatus(): PoolStatus;
}

type PoolStatus = {
  size: number;              // Current pool size
  available: number;         // Available resources
  borrowed: number;          // In-use resources
  pending: number;           // Pending requests
  maxSize: number;          // Maximum size
  created: number;          // Total created
  destroyed: number;        // Total destroyed
};
```

### Requirements

1. Resource Management:
    - Maintain pool of reusable resources
    - Create resources on demand up to max
    - Remove idle resources after timeout
    - Validate resources before use

2. Allocation Strategy:
    - Fair resource distribution
    - Handle concurrent requests
    - Respect acquisition timeout
    - Support minimum pool size

3. Health Management:
    - Periodic health checks
    - Resource validation
    - Automatic replacement
    - Proper cleanup

### Edge Cases to Handle

- Resource creation failure
- Health check failure
- Leaked resources
- Memory pressure
- Deadlocks
- Resource corruption
- Maximum pool size
- Timeout scenarios

### Example

```typescript
// Create a database connection pool
const pool = new ResourcePool<DatabaseConnection>({
  minSize: 5,
  maxSize: 20,
  acquireTimeoutMs: 5000,
  idleTimeoutMs: 30000,
  factory: {
    create: async () => {
      return new DatabaseConnection();
    },
    destroy: async (conn) => {
      await conn.close();
    },
    validate: async (conn) => {
      return conn.isHealthy();
    }
  }
});

// Use a resource
try {
  const connection = await pool.acquire();
  try {
    await connection.query('SELECT * FROM users');
  } finally {
    await pool.release(connection);
  }
} catch (error) {
  console.error('Error acquiring connection:', error);
}

// Check pool status
console.log(pool.getStatus());
// {
//   size: 5,
//   available: 4,
//   borrowed: 1,
//   pending: 0,
//   maxSize: 20,
//   created: 5,
//   destroyed: 0
// }
```

## Notes

This exercise tests your ability to:
- Manage resource lifecycles
- Handle concurrent operations
- Implement health monitoring
- Prevent resource leaks
- Balance pool efficiency

Consider:
- Memory usage patterns
- Resource cleanup
- Error recovery
- Performance optimization
- Deadlock prevention

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Resource prioritization
2. Weighted distribution
3. Connection warming
4. Load balancing
5. Stats collection
6. Auto-scaling
7. Resource tagging
8. Performance metrics

## Real-World Applications

This functionality is commonly used in:
- Database connection pools
- HTTP client pools
- Thread pools
- Socket management
- Service connections
- Worker processes
- GPU resources
- Network resources
