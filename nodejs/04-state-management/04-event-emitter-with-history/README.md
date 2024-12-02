# Event Emitter with History Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript generics
    - Event handling
    - Memory management
    - Basic data structures

## Problem Description

Implement an event emitter that maintains a history of events and supports event replay functionality. This is commonly used in logging systems, undo/redo functionality, and state reconstruction.

### Function Signature
```typescript
type EventRecord<T> = {
  type: string;
  data: T;
  timestamp: number;
  id: string;
};

type EventFilter = {
  type?: string[];
  from?: number;
  to?: number;
  limit?: number;
};

class HistoryEventEmitter {
  constructor(options?: {
    maxHistory?: number;
    historyRetention?: number;  // ms
  });

  // Emit event with data
  emit<T>(type: string, data: T): void;

  // Subscribe to events
  on<T>(type: string, handler: (event: EventRecord<T>) => void): () => void;

  // Get event history
  getHistory(filter?: EventFilter): EventRecord<unknown>[];

  // Replay events
  replay(filter?: EventFilter): Promise<void>;

  // Clear history
  clearHistory(): void;

  // Get emitter status
  getStatus(): EmitterStatus;
}

type EmitterStatus = {
  eventTypes: string[];
  eventCount: number;
  subscriberCount: Record<string, number>;
  oldestEvent: number;
  newestEvent: number;
};
```

### Requirements

1. Event Management:
    - Emit typed events
    - Subscribe to events
    - Unsubscribe support
    - Type-safe handlers

2. History Tracking:
    - Store event records
    - Manage history size
    - Filter history
    - Clear history

3. Event Replay:
    - Replay filtered events
    - Maintain order
    - Handle timing
    - Error recovery

### Edge Cases to Handle

- Maximum history size
- Memory management
- Concurrent events
- Type mismatches
- Replay errors
- Invalid filters
- Duplicate events
- Timing issues

### Example

```typescript
const emitter = new HistoryEventEmitter({
  maxHistory: 1000,
  historyRetention: 24 * 60 * 60 * 1000  // 24 hours
});

// Subscribe to events
const unsubscribe = emitter.on<UserEvent>('user:action', event => {
  console.log(`User ${event.data.userId} performed ${event.data.action}`);
});

// Emit events
emitter.emit('user:action', {
  userId: 123,
  action: 'login'
});

emitter.emit('user:action', {
  userId: 123,
  action: 'update-profile'
});

// Get history
const history = emitter.getHistory({
  type: ['user:action'],
  from: Date.now() - 3600000  // Last hour
});

console.log(emitter.getStatus());
// {
//   eventTypes: ['user:action'],
//   eventCount: 2,
//   subscriberCount: { 'user:action': 1 },
//   oldestEvent: 1621234567890,
//   newestEvent: 1621234569890
// }

// Replay events
await emitter.replay({
  type: ['user:action'],
  limit: 10
});

// Cleanup
unsubscribe();
emitter.clearHistory();
```

## Notes

This exercise tests your ability to:
- Handle event patterns
- Manage event history
- Implement replay logic
- Control memory usage
- Maintain type safety

Consider:
- Memory efficiency
- Event ordering
- Replay timing
- Type safety
- Error handling

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Event persistence
2. Replay speed control
3. Event grouping
4. Conditional replay
5. Event compression
6. Pattern matching
7. Event transformation
8. Streaming support

## Real-World Applications

This functionality is commonly used in:
- Logging systems
- User activity tracking
- Audit trails
- State reconstruction
- Debug tools
- Analytics systems
- Undo/redo features
- Event sourcing
