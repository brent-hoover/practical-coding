# Query Cache Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Query patterns
    - Cache invalidation
    - Parameter matching

## Problem Description

Implement a query cache that can store and retrieve query results based on parameters, handle invalidation patterns, and manage cache dependencies. This is commonly used to optimize expensive database queries or API calls.

### Function Signature
```typescript
type QueryKey = {
  name: string;
  params: Record<string, unknown>;
};

type QueryOptions = {
  ttl?: number;               // Time to live in ms
  tags?: string[];           // For invalidation
  staleWhileRevalidate?: boolean;
};

class QueryCache {
  constructor(options?: {
    maxSize?: number;
    defaultTTL?: number;
  });

  // Store query result
  set(
    key: QueryKey,
    result: unknown,
    options?: QueryOptions
  ): Promise<void>;

  // Get cached query result
  get<T>(key: QueryKey): Promise<T | undefined>;

  // Invalidate queries by tag
  invalidate(tag: string): Promise<void>;

  // Invalidate specific query
  invalidateQuery(key: QueryKey): Promise<void>;

  // Get cache status
  getStats(): QueryCacheStats;
}

type QueryCacheStats = {
  size: number;
  hits: number;
  misses: number;
  invalidations: number;
  staleHits: number;
};
```

### Requirements

1. Query Caching:
    - Parameter-based keys
    - Result storage
    - TTL management
    - Stale data handling

2. Invalidation:
    - Tag-based invalidation
    - Query-specific invalidation
    - Dependency tracking
    - Batch invalidation

3. Cache Management:
    - Size limits
    - Eviction policies
    - Statistics tracking
    - Parameter matching

### Edge Cases to Handle

- Complex parameters
- Parameter ordering
- Partial invalidation
- Concurrent queries
- Invalid parameters
- Type mismatches
- Memory pressure
- Stale data

### Example

```typescript
const cache = new QueryCache({
  maxSize: 1000,
  defaultTTL: 3600000  // 1 hour
});

// Cache query result
await cache.set(
  {
    name: 'getUserPosts',
    params: { userId: 123, limit: 10 }
  },
  posts,
  {
    ttl: 300000,  // 5 minutes
    tags: ['user:123', 'posts'],
    staleWhileRevalidate: true
  }
);

// Get cached result
const posts = await cache.get<Post[]>({
  name: 'getUserPosts',
  params: { userId: 123, limit: 10 }
});

// Invalidate user's data
await cache.invalidate('user:123');

// Check cache stats
console.log(cache.getStats());
// {
//   size: 1,
//   hits: 1,
//   misses: 0,
//   invalidations: 1,
//   staleHits: 0
// }
```

## Notes

This exercise tests your ability to:
- Handle complex cache keys
- Manage invalidation patterns
- Track dependencies
- Handle stale data
- Optimize cache usage

Consider:
- Key generation
- Memory usage
- Invalidation scope
- Cache coherency
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Query batching
2. Partial results
3. Query dependencies
4. Background refresh
5. Query deduplication
6. Parameter normalization
7. Result transformation
8. Cache preloading

## Real-World Applications

This functionality is commonly used in:
- Database query caching
- API request caching
- GraphQL resolvers
- Search results
- Report generation
- Data aggregation
- Content listing
- User data caching
