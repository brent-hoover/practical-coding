# Event Loop Implementation Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Async programming concepts
    - Understanding of queues

## Problem Description

Implement a simplified version of the Node.js event loop that can handle different types of tasks (timers, I/O, promises) with proper ordering and phase management. This helps understand how Node.js processes async operations.

### Function Signature
```typescript
type TaskType = 'timer' | 'io' | 'immediate' | 'promise' | 'check';

type Task = {
  type: TaskType;
  callback: () => void | Promise<void>;
  dueTime?: number;    // For timers
  priority?: number;   // Task priority
};

class EventLoop {
  constructor(options?: {
    maxTasks?: number;
    debug?: boolean;
  });

  // Add task to loop
  addTask(task: Task): void;

  // Process one tick of the loop
  tick(): Promise<void>;

  // Start the event loop
  start(): Promise<void>;

  // Stop the event loop
  stop(): void;

  // Get loop metrics
  getMetrics(): LoopMetrics;
}

type LoopMetrics = {
  processed: Record<TaskType, number>;
  pending: Record<TaskType, number>;
  avgTickTime: number;
};
```

### Requirements

1. Phase Management:
    - Timer tasks
    - I/O tasks
    - Promise tasks
    - Check tasks
    - Proper ordering

2. Task Processing:
    - Task scheduling
    - Task execution
    - Error handling
    - Priority handling

3. Loop Control:
    - Start/stop control
    - Tick processing
    - Metrics tracking
    - Debug logging

### Edge Cases to Handle

- Task errors
- Long running tasks
- Queue overflow
- Nested tasks
- Priority conflicts
- Timer precision
- Task cancellation
- Loop blocking

### Example

```typescript
// Create event loop
const loop = new EventLoop({
  maxTasks: 1000,
  debug: true
});

// Add timer task
loop.addTask({
  type: 'timer',
  callback: () => console.log('Timer fired'),
  dueTime: Date.now() + 1000
});

// Add immediate task
loop.addTask({
  type: 'immediate',
  callback: () => console.log('Immediate task')
});

// Add promise task
loop.addTask({
  type: 'promise',
  callback: async () => {
    const result = await someAsyncOperation();
    console.log(result);
  }
});

// Add I/O task
loop.addTask({
  type: 'io',
  callback: () => {
    fs.readFile('test.txt', (err, data) => {
      console.log(data);
    });
  }
});

// Start loop
await loop.start();

// Process single tick
await loop.tick();

// Check metrics
console.log(loop.getMetrics());
// {
//   processed: {
//     timer: 1,
//     io: 1,
//     immediate: 1,
//     promise: 1,
//     check: 0
//   },
//   pending: {
//     timer: 0,
//     io: 0,
//     immediate: 0,
//     promise: 0,
//     check: 0
//   },
//   avgTickTime: 0.5
// }

// Stop loop
loop.stop();
```

## Notes

This exercise tests your ability to:
- Implement event loop phases
- Handle different task types
- Manage task ordering
- Track execution metrics
- Handle errors

Consider:
- Phase ordering
- Task priorities
- Error propagation
- Performance impact
- Memory usage

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Task priorities
2. Phase hooks
3. Loop inspection
4. Task timeout
5. Task dependencies
6. Loop monitoring
7. Performance tracking
8. Custom phases

## Real-World Applications

This functionality is commonly used in:
- Task schedulers
- Job queues
- Game loops
- Animation systems
- I/O handling
- Event systems
- Test frameworks
- Monitoring tools
