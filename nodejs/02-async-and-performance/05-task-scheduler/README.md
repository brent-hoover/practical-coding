# Task Scheduler Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - Promises and async/await
    - Priority queues
    - TypeScript generics
    - Event handling

## Problem Description

Implement a task scheduler that can schedule and manage asynchronous tasks with priorities, dependencies, and timing constraints. This is commonly used in job scheduling systems, task automation, and workflow management.

### Function Signature
```typescript
type TaskOptions = {
  id: string;
  priority?: number;        // Higher number = higher priority
  dependencies?: string[];  // Task IDs that must complete first
  timeout?: number;        // Maximum execution time in ms
  retries?: number;        // Number of retry attempts
};

type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

type TaskResult<T> = {
  id: string;
  status: TaskStatus;
  result?: T;
  error?: Error;
  startTime: number;
  endTime: number;
  attempts: number;
};

class TaskScheduler {
  constructor(options?: {
    maxConcurrent?: number;
    defaultTimeout?: number;
  });

  // Schedule a new task
  schedule<T>(
    task: () => Promise<T>,
    options: TaskOptions
  ): Promise<TaskResult<T>>;

  // Cancel a scheduled task
  cancel(taskId: string): boolean;

  // Get task status
  getTaskStatus(taskId: string): TaskStatus;

  // Get scheduler status
  getStatus(): SchedulerStatus;
}

type SchedulerStatus = {
  pending: number;
  running: number;
  completed: number;
  failed: number;
  totalTasks: number;
};
```

### Requirements

1. Task Management:
    - Schedule tasks with priorities
    - Handle task dependencies
    - Support task cancellation
    - Track task status

2. Execution Control:
    - Concurrent task limits
    - Task timeouts
    - Automatic retries
    - Dependency resolution

3. Status Tracking:
    - Individual task status
    - Overall scheduler status
    - Task history
    - Error handling

### Edge Cases to Handle

- Circular dependencies
- Task timeout
- Failed dependencies
- Priority conflicts
- Cancellation during execution
- Resource cleanup
- Maximum concurrency
- Queue overflow

### Example

```typescript
const scheduler = new TaskScheduler({
  maxConcurrent: 3,
  defaultTimeout: 5000
});

// Schedule tasks
const task1 = await scheduler.schedule(
  async () => {
    const result = await someAsyncOperation();
    return result;
  },
  {
    id: 'task-1',
    priority: 2
  }
);

const task2 = await scheduler.schedule(
  async () => {
    const result = await anotherOperation();
    return result;
  },
  {
    id: 'task-2',
    priority: 1,
    dependencies: ['task-1']
  }
);

// Check status
console.log(scheduler.getTaskStatus('task-1'));  // 'running'
console.log(scheduler.getStatus());
// {
//   pending: 1,
//   running: 1,
//   completed: 0,
//   failed: 0,
//   totalTasks: 2
// }

// Cancel task
scheduler.cancel('task-2');  // Returns true if successfully cancelled
```

## Notes

This exercise tests your ability to:
- Manage concurrent operations
- Handle task dependencies
- Implement priority scheduling
- Track task state
- Handle errors and timeouts

Consider:
- Memory usage with many tasks
- Deadlock prevention
- Priority inversion
- Resource management
- Error propagation

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Recurring tasks
2. Task groups
3. Progress reporting
4. Resource quotas
5. Task persistence
6. Distributed scheduling
7. Dynamic priorities
8. Conditional execution

## Real-World Applications

This functionality is commonly used in:
- Background job processing
- Workflow automation
- Task orchestration
- Build systems
- Batch processing
- Resource scheduling
- Event planning
- Service automation
