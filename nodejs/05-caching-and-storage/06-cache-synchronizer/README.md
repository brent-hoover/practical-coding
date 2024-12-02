# Cache Synchronizer Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Distributed systems concepts
    - Conflict resolution
    - Event handling

## Problem Description

Implement a cache synchronization system that can maintain consistency across multiple cache instances, handle conflicts, and manage distributed updates. This is used in distributed systems to ensure cache coherency across multiple nodes.

### Function Signature
```typescript
type SyncOptions = {
  syncInterval?: number;     // Sync interval in ms
  conflict?: 'newest' | 'oldest' | 'custom';
  retries?: number;         // Number of sync retries
  batchSize?: number;       // Updates per batch
};

type SyncEvent = {
  key: string;
  value: unknown;
  timestamp: number;
  node: string;
  version: number;
};

class CacheSynchronizer {
  constructor(options: SyncOptions);

  // Connect to sync network
  connect(nodeId: string): Promise<void>;

  // Register cache instance
  registerCache(cache: CacheInstance): void;

  // Handle incoming updates
  handleUpdate(event: SyncEvent): Promise<void>;

  // Force synchronization
  sync(): Promise<void>;

  // Get sync status
  getStatus(): SyncStatus;
}

interface CacheInstance {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<void>;
  getKeys(): Promise<string[]>;
}

type SyncStatus = {
  connected: boolean;
  lastSync: number;
  peers: string[];
  pending: number;
  conflicts: number;
};
```

### Requirements

1. Synchronization:
    - Detect changes
    - Propagate updates
    - Handle concurrent updates
    - Maintain consistency

2. Conflict Resolution:
    - Version tracking
    - Timestamp comparison
    - Custom resolution
    - Update merging

3. Network Management:
    - Node discovery
    - Connection handling
    - Retry logic
    - Batch updates

### Edge Cases to Handle

- Network partitions
- Concurrent updates
- Clock skew
- Data corruption
- Node failures
- Partial updates
- Version conflicts
- Recovery scenarios

### Example

```typescript
const sync = new CacheSynchronizer({
  syncInterval: 5000,       // 5 seconds
  conflict: 'newest',
  retries: 3,
  batchSize: 100
});

// Connect node to network
await sync.connect('node-1');

// Register local cache
sync.registerCache({
  async get(key) {
    return localCache.get(key);
  },
  async set(key, value) {
    await localCache.set(key, value);
  },
  async delete(key) {
    await localCache.delete(key);
  },
  async getKeys() {
    return localCache.keys();
  }
});

// Handle incoming update
sync.handleUpdate({
  key: 'user:123',
  value: { name: 'John' },
  timestamp: Date.now(),
  node: 'node-2',
  version: 1
});

// Force sync
await sync.sync();

// Check status
console.log(sync.getStatus());
// {
//   connected: true,
//   lastSync: 1621234567890,
//   peers: ['node-2', 'node-3'],
//   pending: 0,
//   conflicts: 0
// }
```

## Notes

This exercise tests your ability to:
- Handle distributed state
- Resolve conflicts
- Manage network issues
- Track versions
- Ensure consistency

Consider:
- Network efficiency
- Conflict strategies
- Data consistency
- Error recovery
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Delta updates
2. Gossip protocol
3. Merkle trees
4. Vector clocks
5. Partial sync
6. Priority sync
7. Sync groups
8. Change notification

## Real-World Applications

This functionality is commonly used in:
- Distributed caches
- Multi-region systems
- Edge computing
- CDN synchronization
- Database replication
- Service meshes
- Cluster management
- Mobile sync
