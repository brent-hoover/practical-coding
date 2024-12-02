# Persistent Store Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - File system operations
    - Index management
    - CRUD operations
    - Basic transaction patterns

## Problem Description

Implement a persistent key-value store with indexing, transactions, and query capabilities. This is commonly used for local data storage, configuration persistence, and simple databases.

### Function Signature
```typescript
type StoreOptions = {
  path: string;
  indexes?: string[];         // Fields to index
  autoCommit?: boolean;      // Auto-commit changes
  maxSize?: number;         // Max entries
};

type Query<T> = {
  where?: Partial<T>;
  sort?: Array<{field: keyof T; order: 'asc' | 'desc'}>;
  limit?: number;
  offset?: number;
};

class PersistentStore<T extends Record<string, any>> {
  constructor(options: StoreOptions);

  // CRUD Operations
  insert(data: T): Promise<string>;  // Returns ID
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<T | undefined>;

  // Query Operations
  find(query: Query<T>): Promise<T[]>;
  findOne(query: Query<T>): Promise<T | undefined>;

  // Transaction Management
  beginTransaction(): Promise<Transaction>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  // Maintenance
  compact(): Promise<void>;
  createIndex(field: keyof T): Promise<void>;
  getStats(): StoreStats;
}

type StoreStats = {
  size: number;
  indexes: string[];
  transactions: number;
  lastCompaction: number;
};
```

### Requirements

1. Data Management:
    - CRUD operations
    - Persistence
    - Index management
    - Query support

2. Transaction Support:
    - Begin/commit/rollback
    - Atomic operations
    - Durability
    - Isolation

3. Storage Management:
    - File organization
    - Compaction
    - Size limits
    - Error recovery

### Edge Cases to Handle

- Concurrent access
- Transaction conflicts
- Corrupt data
- Power failures
- Invalid queries
- Index corruption
- Type mismatches
- Storage limits

### Example

```typescript
interface User {
  id?: string;
  name: string;
  email: string;
  age: number;
}

const store = new PersistentStore<User>({
  path: './data/users',
  indexes: ['email', 'age'],
  autoCommit: true
});

// Insert data
const id = await store.insert({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Query data
const users = await store.find({
  where: { age: 30 },
  sort: [{ field: 'name', order: 'asc' }],
  limit: 10
});

// Transaction example
const transaction = await store.beginTransaction();
try {
  await store.update(id, { age: 31 });
  await store.insert({
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 28
  });
  await store.commit();
} catch (error) {
  await store.rollback();
}

// Check store stats
console.log(store.getStats());
// {
//   size: 2,
//   indexes: ['email', 'age'],
//   transactions: 1,
//   lastCompaction: 1621234567890
// }
```

## Notes

This exercise tests your ability to:
- Manage persistent data
- Handle transactions
- Implement indexing
- Process queries
- Ensure data integrity

Consider:
- File organization
- Index efficiency
- Transaction safety
- Query performance
- Error recovery

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Full-text search
2. Data encryption
3. Change notifications
4. Backup/restore
5. Query caching
6. Migration support
7. Binary storage
8. Composite indexes

## Real-World Applications

This functionality is commonly used in:
- Local databases
- Configuration storage
- Data caching
- Offline-first apps
- Desktop applications
- Development tools
- Testing systems
- Log storage
