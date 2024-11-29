# Cache Decorator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript decorators
    - Function types and generics
    - Memory management concepts

## Problem Description

Implement a cache decorator that can memoize function results based on their arguments. The cache should support TTL (Time To Live), capacity limits, and custom key generation. This is a common pattern for optimizing expensive operations and reducing redundant computations.

### Function Signature
```typescript
type CacheOptions = {
  ttlMs?: number;           // Time to live in milliseconds
  maxSize?: number;         // Maximum number of cached results
  keyGenerator?: (...args: any[]) => string;  // Custom cache key generator
};

type CacheStats = {
  hits: number;             // Number of cache hits
  misses: number;          // Number of cache misses
  size: number;            // Current cache size
  evictions: number;       // Number of evicted entries
};

function cacheable(options?: CacheOptions): MethodDecorator;

class Cache {
  // Clear all entries
  clear(): void;
  
  // Remove specific entry
  invalidate(...args: any[]): void;
  
  // Get cache statistics
  getStats(): CacheStats;
}
```

### Requirements

1. Basic Caching:
    - Cache function results based on arguments
    - Support any function type with proper type safety
    - Return cached result when available
    - Calculate and store result when not cached

2. Cache Management:
    - Support TTL expiration
    - Implement size-based eviction (LRU)
    - Allow manual invalidation
    - Track cache statistics

3. Configuration:
    - Configurable TTL
    - Configurable cache size
    - Custom key generation
    - Enable/disable options

### Edge Cases to Handle

- Function throwing errors
- Complex argument types
- Memory leaks
- Race conditions
- TTL boundary conditions
- Argument mutations
- Cache key collisions

### Example

```typescript
class ExampleService {
  @cacheable({ ttlMs: 60000, maxSize: 100 })
  async expensiveOperation(id: string, options: object): Promise<Result> {
    // Expensive calculation or API call
    return someExpensiveCall(id, options);
  }
}

// Usage
const service = new ExampleService();

// First call - performs calculation
const result1 = await service.expensiveOperation('123', { type: 'full' });

// Second call - returns cached result
const result2 = await service.expensiveOperation('123', { type: 'full' });

// Check cache statistics
const stats = Cache.getStats();
console.log(stats);
// {
//   hits: 1,
//   misses: 1,
//   size: 1,
//   evictions: 0
// }
```

## Notes

This exercise tests your ability to:
- Work with TypeScript decorators
- Handle function memoization
- Manage memory efficiently
- Handle concurrent operations
- Implement eviction strategies

Consider:
- Memory usage patterns
- Concurrent access handling
- Type safety across generic functions
- Eviction strategy efficiency
- Key generation reliability

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Different eviction strategies (FIFO, LFU)
2. Cache prefetching
3. Batch invalidation patterns
4. Cache event listeners
5. Persistent cache storage
6. Cache warming strategies
7. Partial result caching
8. Cache synchronization

## Real-World Applications

This functionality is commonly used in:
- API response caching
- Database query result caching
- Computation memoization
- Configuration caching
- Session data storage
- Template rendering
- Asset compilation
- GraphQL resolvers
