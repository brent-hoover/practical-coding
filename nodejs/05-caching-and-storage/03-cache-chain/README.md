# Cache Chain Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Cache concepts
    - Storage patterns
    - Promise chains

## Problem Description

Implement a cache chain system that manages multiple cache layers with different storage backends and strategies. This is used to optimize data access by combining different caching technologies (e.g., memory, disk, network) in a hierarchical manner.

### Function Signature
```typescript
type CacheLayer<T> = {
  name: string;
  read: (key: string) => Promise<T | undefined>;
  write: (key: string, value: T) => Promise<void>;
  delete: (key: string) => Promise<void>;
  clear: () => Promise<void>;
};

type CacheStrategy = 'write-through' | 'write-behind' | 'read-through';

type ChainOptions = {
  strategy: CacheStrategy;
  writeDelay?: number;      // For write-behind
  retries?: number;         // Number of retry attempts
  timeout?: number;         // Operation timeout
};

class CacheChain<T> {
  constructor(layers: CacheLayer<T>[], options: ChainOptions);

  // Get value from cache chain
  get(key: string): Promise<T | undefined>;

  // Set value in cache chain
  set(key: string, value: T): Promise<void>;

  // Remove value from cache chain
  delete(key: string): Promise<void>;

  // Clear all caches
  clear(): Promise<void>;

  // Get chain statistics
  getStats(): Promise<ChainStats>;
}

type ChainStats = {
  hits: Record<string, number>;     // Hits per layer
  misses: Record<string, number>;   // Misses per layer
  writesPending: number;            // For write-behind
  errors: number;
};
```

### Requirements

1. Chain Management:
    - Multiple cache layers
    - Layer ordering
    - Layer fallbacks
    - Operation propagation

2. Strategy Implementation:
    - Write-through: sync updates
    - Write-behind: async updates
    - Read-through: fetch missing
    - Error handling

3. Performance Tracking:
    - Hit/miss statistics
    - Error tracking
    - Performance metrics
    - Layer health

### Edge Cases to Handle

- Layer failures
- Partial updates
- Invalid layers
- Cache inconsistency
- Write conflicts
- Timeout scenarios
- Race conditions
- Data corruption

### Example

```typescript
// Create cache layers
const memoryCache = new MemoryCacheLayer<string>();
const diskCache = new DiskCacheLayer<string>();
const remoteCache = new RemoteCacheLayer<string>();

// Create cache chain
const chain = new CacheChain([
  memoryCache,   // Fastest, smallest capacity
  diskCache,     // Medium speed, medium capacity
  remoteCache    // Slowest, largest capacity
], {
  strategy: 'write-through',
  retries: 3,
  timeout: 5000
});

// Store value
await chain.set('user:123', JSON.stringify({
  id: 123,
  name: 'John Doe'
}));

// Retrieve value (checks layers in order)
const value = await chain.get('user:123');

// Delete from all layers
await chain.delete('user:123');

// Check statistics
console.log(await chain.getStats());
// {
//   hits: {
//     memory: 1,
//     disk: 0,
//     remote: 0
//   },
//   misses: {
//     memory: 0,
//     disk: 0,
//     remote: 0
//   },
//   writesPending: 0,
//   errors: 0
// }
```

## Notes

This exercise tests your ability to:
- Manage multiple caches
- Implement caching strategies
- Handle failures gracefully
- Track performance metrics
- Ensure data consistency

Consider:
- Cache coherency
- Error propagation
- Performance impact
- Memory management
- Retry strategies

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom strategies
2. Layer priorities
3. Batch operations
4. Cache warming
5. Health checks
6. Layer reordering
7. Adaptive strategies
8. Circuit breaker

## Real-World Applications

This functionality is commonly used in:
- Multi-tier caching
- CDN integration
- Database caching
- API response caching
- Asset caching
- Session storage
- Content delivery
- Distributed systems
