# Basic State Container Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Generics
    - Event handling

## Problem Description

Implement a type-safe state container that can store values, notify on changes, and ensure type safety for stored data. This is a fundamental pattern for managing application state.

### Function Signature
```typescript
type Listener<T> = (newValue: T, oldValue: T) => void;

type StateOptions<T> = {
  initialValue?: T;
  validate?: (value: T) => boolean;
};

class StateContainer<T> {
  constructor(options?: StateOptions<T>);

  // Get current value
  getValue(): T;

  // Set new value
  setValue(newValue: T): void;

  // Subscribe to changes
  subscribe(listener: Listener<T>): () => void;

  // Reset to initial value
  reset(): void;

  // Get container status
  getStatus(): ContainerStatus<T>;
}

type ContainerStatus<T> = {
  value: T;
  initialized: boolean;
  subscribers: number;
  changes: number;
};
```

### Requirements

1. State Management:
    - Store and retrieve values
    - Type-safe operations
    - Initial value support
    - Reset capability

2. Change Notifications:
    - Subscribe to changes
    - Unsubscribe support
    - Change tracking
    - Listener management

3. Validation:
    - Optional value validation
    - Error reporting
    - Type checking
    - State consistency

### Edge Cases to Handle

- Undefined initial value
- Invalid values
- Multiple subscribers
- Unsubscribe handling
- Memory leaks
- Type mismatches
- Circular updates
- Value equality

### Example

```typescript
// Create a number state container
const counter = new StateContainer<number>({
  initialValue: 0,
  validate: (value) => value >= 0
});

// Subscribe to changes
const unsubscribe = counter.subscribe((newValue, oldValue) => {
  console.log(`Counter changed from ${oldValue} to ${newValue}`);
});

// Update value
counter.setValue(5);  // Logs: "Counter changed from 0 to 5"

// Check status
console.log(counter.getStatus());
// {
//   value: 5,
//   initialized: true,
//   subscribers: 1,
//   changes: 1
// }

// Reset to initial value
counter.reset();  // Logs: "Counter changed from 5 to 0"

// Cleanup
unsubscribe();
```

## Notes

This exercise tests your ability to:
- Work with generics
- Handle state changes
- Manage subscriptions
- Implement validation
- Ensure type safety

Consider:
- Memory management
- Type safety
- Change detection
- Listener cleanup
- Value immutability

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Computed values
2. Change batching
3. Middleware support
4. State persistence
5. Change history
6. Async validation
7. Value transformers
8. Debug logging

## Real-World Applications

This functionality is commonly used in:
- Component state management
- Form handling
- Application settings
- User preferences
- UI state
- Feature flags
- Theme management
- Configuration storage
