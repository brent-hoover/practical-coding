# Basic Event Emitter Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Generic types
    - Event handling concepts

## Problem Description

Implement a type-safe event emitter that can register listeners, emit events, and manage subscriptions. This is a fundamental pattern used for handling events and implementing the observer pattern in applications.

### Function Signature
```typescript
type EventListener<T> = (event: T) => void | Promise<void>;

type EventOptions = {
  once?: boolean;           // Remove after first trigger
  prepend?: boolean;        // Add to start of listener queue
  async?: boolean;          // Handle async listeners
};

class EventEmitter {
  // Register event listener
  on<T>(
    event: string,
    listener: EventListener<T>,
    options?: EventOptions
  ): () => void;

  // Register one-time listener
  once<T>(
    event: string,
    listener: EventListener<T>
  ): () => void;

  // Emit event
  emit<T>(event: string, data: T): Promise<void>;

  // Remove specific listener
  off<T>(
    event: string,
    listener: EventListener<T>
  ): void;

  // Remove all listeners for event
  removeAllListeners(event?: string): void;

  // Get emitter status
  getStatus(): EmitterStatus;
}

type EmitterStatus = {
  events: string[];
  listenerCount: Record<string, number>;
  asyncListeners: number;
  emitCount: number;
};
```

### Requirements

1. Event Management:
    - Register listeners
    - Remove listeners
    - Emit events
    - Support async listeners

2. Listener Options:
    - One-time listeners
    - Listener ordering
    - Async handling
    - Error handling

3. Type Safety:
    - Generic event types
    - Type-safe listeners
    - Type inference
    - Error checking

### Edge Cases to Handle

- Invalid events
- Listener errors
- Async timing
- Memory leaks
- Order preservation
- Type mismatches
- Concurrent emissions
- Removal during emit

### Example

```typescript
// Create emitter
const emitter = new EventEmitter();

// Define event types
interface UserEvent {
  userId: string;
  action: string;
  timestamp: number;
}

// Register listeners
const unsubscribe = emitter.on<UserEvent>('user:action', 
  (event) => {
    console.log(
      `User ${event.userId} performed ${event.action}`
    );
  },
  { async: true }
);

// One-time listener
emitter.once<UserEvent>('user:action', 
  (event) => {
    console.log('First action only');
  }
);

// Emit event
await emitter.emit<UserEvent>('user:action', {
  userId: '123',
  action: 'login',
  timestamp: Date.now()
});

// Check status
console.log(emitter.getStatus());
// {
//   events: ['user:action'],
//   listenerCount: { 'user:action': 2 },
//   asyncListeners: 1,
//   emitCount: 1
// }

// Cleanup
unsubscribe();
```

## Notes

This exercise tests your ability to:
- Handle event patterns
- Manage subscriptions
- Ensure type safety
- Handle async operations
- Manage memory

Consider:
- Listener cleanup
- Error propagation
- Type inference
- Memory usage
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Event namespaces
2. Wildcard events
3. Event history
4. Priority levels
5. Event batching
6. Listener timeouts
7. Error boundaries
8. Debug logging

## Real-World Applications

This functionality is commonly used in:
- UI components
- Event handling
- Message systems
- State management
- Application hooks
- Plugin systems
- Service communication
- Logger implementations
