# Event Sourcing Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Event patterns
    - State management
    - Domain modeling

## Problem Description

Implement an event sourcing system that can track all state changes as events, rebuild state from event history, and manage event streams. This is used in systems requiring complete audit trails, state reconstruction, and temporal queries.

### Function Signature
```typescript
type Event = {
  id: string;
  type: string;
  data: unknown;
  metadata: {
    timestamp: number;
    version: number;
    actor?: string;
  };
};

type EventStore = {
  append(stream: string, events: Event[]): Promise<void>;
  read(stream: string, options?: ReadOptions): Promise<Event[]>;
  getSnapshot(stream: string): Promise<Snapshot | null>;
};

type ReadOptions = {
  fromVersion?: number;
  toVersion?: number;
  fromTimestamp?: number;
  toTimestamp?: number;
};

class EventSourced<T> {
  constructor(
    store: EventStore,
    options?: {
      snapshotFrequency?: number;
      validationRules?: ValidationRule[];
    }
  );

  // Apply new events
  apply(events: Event[]): Promise<void>;

  // Get current state
  getState(): T;

  // Get state at specific version
  getStateAt(version: number): Promise<T>;

  // Create snapshot
  snapshot(): Promise<void>;

  // Get event history
  getHistory(options?: ReadOptions): Promise<Event[]>;

  // Get metrics
  getMetrics(): EventSourcedMetrics;
}

type EventSourcedMetrics = {
  totalEvents: number;
  currentVersion: number;
  lastSnapshotVersion: number;
  snapshotCount: number;
  replayCount: number;
};
```

### Requirements

1. Event Management:
    - Event storage
    - Event versioning
    - Event metadata
    - Event validation

2. State Management:
    - State reconstruction
    - Snapshot management
    - Version tracking
    - Temporal queries

3. Performance:
    - Efficient replay
    - Snapshot strategy
    - Optimistic locking
    - Concurrency control

### Edge Cases to Handle

- Conflicting events
- Invalid events
- State corruption
- Version conflicts
- Snapshot failures
- Replay errors
- Concurrent updates
- Memory pressure

### Example

```typescript
// Define aggregate state
interface BankAccount {
  id: string;
  balance: number;
  lastTransaction: number;
}

// Create event sourced aggregate
const account = new EventSourced<BankAccount>(eventStore, {
  snapshotFrequency: 100,  // Snapshot every 100 events
  validationRules: [
    (event) => event.data.amount > 0,
    (event) => event.type === 'deposit' || event.type === 'withdraw'
  ]
});

// Apply events
await account.apply([
  {
    id: 'evt-1',
    type: 'deposit',
    data: { amount: 100 },
    metadata: {
      timestamp: Date.now(),
      version: 1,
      actor: 'user-123'
    }
  }
]);

// Get current state
const state = account.getState();
console.log(state);
// {
//   id: 'account-123',
//   balance: 100,
//   lastTransaction: 1621234567890
// }

// Get historical state
const previousState = await account.getStateAt(5);

// Check metrics
console.log(account.getMetrics());
// {
//   totalEvents: 1,
//   currentVersion: 1,
//   lastSnapshotVersion: 0,
//   snapshotCount: 0,
//   replayCount: 0
// }
```

## Notes

This exercise tests your ability to:
- Implement event sourcing
- Manage state changes
- Handle versioning
- Ensure consistency
- Optimize performance

Consider:
- Event schema
- State consistency
- Memory usage
- Performance impact
- Concurrency handling

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Event upcasting
2. Temporal queries
3. Event schema validation
4. Optimistic concurrency
5. Event handlers
6. Projection support
7. Event migration
8. Conflict resolution

## Real-World Applications

This functionality is commonly used in:
- Financial systems
- Audit systems
- Version control
- Domain modeling
- Change tracking
- Compliance systems
- Business analytics
- User activity tracking
