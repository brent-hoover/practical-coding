# Memory Cache Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Data structures
    - Memory management concepts

## Problem Description

Implement an in-memory cache with support for TTL (Time To Live), size limits, and eviction policies. This is a fundamental pattern used in applications to improve performance by storing frequently accessed data in memory.

### Function Signature
```typescript
type CacheOptions = {
  maxSize?: number;         // Maximum number of items
  ttl?: number;            // Default TTL in milliseconds
  evictionPolicy?: 'lru' | 'fifo';
};

type CacheEntry<T> = {
  value: T;
  expiresAt?: number;
  lastAccessed: number;
};

class MemoryCache<T> {
  constructor(options?: CacheOptions);

  // Set value with optional TTL
  set(key: string, value: T, ttl?: number): void;

  // Get value if exists and not expired
  get(key: string): T | undefined;

  // Check if key exists and not expired
  has(key: string): boolean;

  // Remove value
  delete(key: string): boolean;

  // Clear all values
  clear(): void;

  // Get cache statistics
  getStats(): CacheStats;
}

type CacheStats = {
  size: number;
  hits: number;
  misses: number;
  evictions: number;
};
```

### Requirements

1. Basic Cache Operations:
    - Store key-value pairs
    - Retrieve values
    - Delete values
    - Clear cache

2. TTL Management:
    - Support item expiration
    - Default TTL handling
    - Expiration checks
    - Cleanup of expired items

3. Size Management:
    - Enforce size limits
    - Implement eviction policies
    - Track cache statistics
    - Memory cleanup

### Edge Cases to Handle

- Expired items
- Cache full
- Invalid TTL values
- Key collisions
- Memory pressure
- Type mismatches
- Concurrent access
- Edge timing cases

### Example

```typescript
const cache = new MemoryCache<string>({
  maxSize: 1000,
  ttl: 60000,  // 1 minute
  evictionPolicy: 'lru'
});

// Set values
cache.set('key1', 'value1');
cache.set('key2', 'value2', 30000);  // 30 second TTL

// Get values
const value = cache.get('key1');
console.log(value);  // 'value1'

// Check existence
console.log(cache.has('key2'));  // true

// Wait for expiration
setTimeout(() => {
  console.log(cache.has('key2'));  // false
}, 31000);

// Check statistics
console.log(cache.getStats());
// {
//   size: 2,
//   hits: 1,
//   misses: 0,
//   evictions: 0
// }
```

## Notes

This exercise tests your ability to:
- Implement caching strategies
- Handle item expiration
- Manage memory usage
- Track cache statistics
- Handle edge cases

Consider:
- Memory efficiency
- Eviction strategies
- Cleanup timing
- Type safety
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Additional eviction policies
2. Memory size tracking
3. Event notifications
4. Batch operations
5. Pattern matching
6. Cache warming
7. Weak references
8. Statistics logging

## Real-World Applications

This functionality is commonly used in:
- API response caching
- Database query caching
- Session data storage
- Configuration caching
- Route resolvers
- Template rendering
- Computation results
- Object pools
