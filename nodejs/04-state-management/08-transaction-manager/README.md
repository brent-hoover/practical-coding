# Transaction Manager Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Transaction patterns
    - Error handling
    - Async operations

## Problem Description

Implement a transaction manager that can handle atomic operations, nested transactions, and rollbacks. This is commonly used in systems requiring data consistency and operation grouping.

### Function Signature
```typescript
type TransactionOperation<T> = {
  execute: () => Promise<T>;
  rollback: () => Promise<void>;
  description: string;
};

type TransactionOptions = {
  timeout?: number;        // Max transaction time (ms)
  retries?: number;       // Retry attempts on failure
  isolationLevel?: 'read' | 'write';
};

class TransactionManager {
  constructor(options?: TransactionOptions);

  // Start a new transaction
  async begin(): Promise<Transaction>;

  // Get current transaction
  getCurrentTransaction(): Transaction | null;

  // Get manager status
  getStatus(): TransactionManagerStatus;
}

class Transaction {
  // Add operation to transaction
  addOperation<T>(operation: TransactionOperation<T>): Promise<T>;

  // Commit transaction
  commit(): Promise<void>;

  // Rollback transaction
  rollback(): Promise<void>;

  // Create nested transaction
  createNested(): Transaction;

  // Get transaction status
  getStatus(): TransactionStatus;
}

type TransactionStatus = {
  id: string;
  operations: number;
  state: 'active' | 'committed' | 'rolledBack';
  startTime: number;
  nested: number;
};

type TransactionManagerStatus = {
  activeTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  averageOperations: number;
};
```

### Requirements

1. Transaction Management:
    - Start transactions
    - Track operations
    - Handle commits
    - Manage rollbacks

2. Operation Handling:
    - Execute operations
    - Track changes
    - Handle failures
    - Maintain order

3. Nesting Support:
    - Nested transactions
    - Partial commits
    - Cascading rollbacks
    - Isolation levels

### Edge Cases to Handle

- Operation failures
- Timeout scenarios
- Nested rollbacks
- Partial commits
- Concurrent transactions
- Resource cleanup
- Deadlocks
- Memory leaks

### Example

```typescript
const manager = new TransactionManager({
  timeout: 5000,
  retries: 3
});

// Start transaction
const transaction = await manager.begin();

try {
  // Add operations
  await transaction.addOperation({
    execute: async () => {
      await database.saveUser(user);
      return user.id;
    },
    rollback: async () => {
      await database.deleteUser(user.id);
    },
    description: 'Save user'
  });

  // Create nested transaction
  const nested = transaction.createNested();
  
  await nested.addOperation({
    execute: async () => {
      await database.saveUserPreferences(user.id, prefs);
    },
    rollback: async () => {
      await database.deleteUserPreferences(user.id);
    },
    description: 'Save preferences'
  });

  await nested.commit();
  await transaction.commit();

} catch (error) {
  await transaction.rollback();
}

// Check status
console.log(transaction.getStatus());
// {
//   id: 'tx-123',
//   operations: 2,
//   state: 'committed',
//   startTime: 1621234567890,
//   nested: 1
// }

console.log(manager.getStatus());
// {
//   activeTransactions: 0,
//   completedTransactions: 1,
//   failedTransactions: 0,
//   averageOperations: 2
// }
```

## Notes

This exercise tests your ability to:
- Manage atomic operations
- Handle nested structures
- Implement rollbacks
- Track transaction state
- Handle concurrency

Consider:
- Transaction isolation
- Resource management
- Error propagation
- State consistency
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Savepoints
2. Transaction logs
3. Recovery system
4. Deadlock detection
5. Performance metrics
6. Transaction hooks
7. Async operations
8. Resource pooling

## Real-World Applications

This functionality is commonly used in:
- Database systems
- Financial operations
- Order processing
- Inventory management
- Booking systems
- Document processing
- Multi-step workflows
- Data synchronization
