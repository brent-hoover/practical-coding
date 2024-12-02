# Config Change Observer Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Observer pattern
    - Event handling
    - Async operations

## Problem Description

Implement a configuration observer that can watch for changes in configuration sources, notify subscribers, and manage configuration updates. This is commonly used in applications that need to respond to configuration changes without restarting.

### Function Signature
```typescript
type ConfigChangeEvent = {
  key: string;
  oldValue: unknown;
  newValue: unknown;
  source: string;
  timestamp: number;
};

type SubscriptionOptions = {
  keys?: string[];           // Specific keys to watch
  debounceMs?: number;       // Debounce notifications
  filter?: (event: ConfigChangeEvent) => boolean;
};

class ConfigChangeObserver {
  constructor(options?: {
    pollIntervalMs?: number;
    sources?: ConfigSource[];
  });

  // Subscribe to changes
  subscribe(
    callback: (events: ConfigChangeEvent[]) => void,
    options?: SubscriptionOptions
  ): Subscription;

  // Start watching sources
  start(): Promise<void>;

  // Stop watching sources
  stop(): Promise<void>;

  // Force check for changes
  checkNow(): Promise<void>;

  // Get current state
  getStatus(): ObserverStatus;
}

type ObserverStatus = {
  watching: boolean;
  lastCheck: number;
  subscribers: number;
  changes: number;
};
```

### Requirements

1. Change Detection:
    - Watch multiple config sources
    - Detect value changes
    - Track change metadata
    - Handle different source types

2. Notification System:
    - Support multiple subscribers
    - Filter notifications
    - Debounce changes
    - Batch notifications

3. Resource Management:
    - Efficient polling
    - Clean shutdown
    - Memory management
    - Error handling

### Edge Cases to Handle

- Source unavailable
- Type changes
- Rapid changes
- Circular updates
- Invalid subscribers
- Memory leaks
- Race conditions
- Source errors

### Example

```typescript
const observer = new ConfigChangeObserver({
  pollIntervalMs: 1000,
  sources: [
    { type: 'file', path: './config.json' },
    { type: 'env', prefix: 'APP_' }
  ]
});

// Subscribe to all changes
const subscription = observer.subscribe(
  (changes) => {
    changes.forEach(change => {
      console.log(`Config changed: ${change.key}`);
      console.log(`Old value: ${change.oldValue}`);
      console.log(`New value: ${change.newValue}`);
    });
  },
  {
    keys: ['database', 'api.*'],
    debounceMs: 500
  }
);

// Start watching
await observer.start();

// Check status
console.log(observer.getStatus());
// {
//   watching: true,
//   lastCheck: 1621234567890,
//   subscribers: 1,
//   changes: 0
// }

// Later: clean up
subscription.unsubscribe();
await observer.stop();
```

## Notes

This exercise tests your ability to:
- Implement observer pattern
- Handle async operations
- Manage subscriptions
- Process configuration changes
- Handle resource cleanup

Consider:
- Polling frequency
- Memory usage
- Change detection efficiency
- Notification timing
- Resource cleanup

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Change validation
2. Rollback support
3. Change history
4. Change batching
5. Priority notifications
6. Source health monitoring
7. Change persistence
8. Remote configuration

## Real-World Applications

This functionality is commonly used in:
- Configuration management
- Hot reloading
- Feature flags
- Environment updates
- Service discovery
- Dynamic settings
- Monitoring systems
- Cloud configuration
