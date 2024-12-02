# Observable Store Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript generics
    - Reactive programming concepts
    - Dependency tracking
    - State management patterns

## Problem Description

Implement an observable store with computed properties, dependency tracking, and reactive updates. This is commonly used in frontend frameworks and reactive state management systems.

### Function Signature
```typescript
type Computed<T> = {
  get: () => T;
  dependencies: string[];
};

type StoreOptions<T> = {
  initialState: T;
  computed?: Record<string, Computed<any>>;
  middleware?: StoreMiddleware<T>[];
};

type Subscription<T> = {
  selector: (state: T) => any;
  handler: (newValue: any, oldValue: any) => void;
};

class ObservableStore<T extends object> {
  constructor(options: StoreOptions<T>);

  // Update state
  update(updater: (state: T) => void): void;

  // Get current state
  getState(): T;

  // Get computed value
  getComputed<K>(name: string): K;

  // Subscribe to changes
  subscribe<K>(
    selector: (state: T) => K,
    handler: (newValue: K, oldValue: K) => void
  ): () => void;

  // Add computed property
  addComputed<K>(
    name: string,
    computed: Computed<K>
  ): void;

  // Get store status
  getStatus(): StoreStatus;
}

type StoreStatus = {
  subscribers: number;
  computedProperties: string[];
  updateCount: number;
  lastUpdateTime: number;
};
```

### Requirements

1. State Management:
    - Immutable state updates
    - Batch updates
    - History tracking
    - Middleware support

2. Computed Properties:
    - Dependency tracking
    - Caching
    - Automatic updates
    - Circular dependency detection

3. Subscriptions:
    - Selective subscriptions
    - Change notifications
    - Subscription cleanup
    - Update batching

### Edge Cases to Handle

- Circular dependencies
- Deep state changes
- Memory leaks
- Type safety
- Stale computations
- Update loops
- Invalid selectors
- Subscription cleanup

### Example

```typescript
interface AppState {
  count: number;
  multiplier: number;
}

const store = new ObservableStore<AppState>({
  initialState: {
    count: 0,
    multiplier: 2
  },
  computed: {
    doubled: {
      get: () => store.getState().count * 2,
      dependencies: ['count']
    },
    multiplied: {
      get: () => store.getState().count * store.getState().multiplier,
      dependencies: ['count', 'multiplier']
    }
  }
});

// Subscribe to changes
const unsubscribe = store.subscribe(
  state => state.count,
  (newCount, oldCount) => {
    console.log(`Count changed from ${oldCount} to ${newCount}`);
  }
);

// Update state
store.update(state => {
  state.count += 1;
});

// Get computed value
console.log(store.getComputed<number>('doubled'));  // 2
console.log(store.getComputed<number>('multiplied'));  // 2

// Check status
console.log(store.getStatus());
// {
//   subscribers: 1,
//   computedProperties: ['doubled', 'multiplied'],
//   updateCount: 1,
//   lastUpdateTime: 1621234567890
// }

// Cleanup
unsubscribe();
```

## Notes

This exercise tests your ability to:
- Implement reactive patterns
- Track dependencies
- Manage subscriptions
- Handle computed values
- Maintain state consistency

Consider:
- Update performance
- Memory management
- Dependency tracking
- Type safety
- Change detection

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Time travel debugging
2. State persistence
3. Derived collections
4. Async computations
5. Transaction support
6. Change validation
7. State snapshots
8. Performance monitoring

## Real-World Applications

This functionality is commonly used in:
- UI frameworks
- State management
- Data visualization
- Form handling
- Data binding
- Real-time updates
- Application state
- Component libraries
