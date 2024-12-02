# State Machine Builder Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - State machine concepts
    - Graph theory basics
    - Type system manipulation

## Problem Description

Implement a state machine builder that can define states, transitions, and guards with full type safety. This is used for managing complex state flows, workflow engines, and process management.

### Function Signature
```typescript
type StateConfig<TState extends string, TEvent extends string> = {
  name: TState;
  initial?: boolean;
  final?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
};

type TransitionConfig<TState extends string, TEvent extends string> = {
  from: TState;
  to: TState;
  event: TEvent;
  guard?: (context: any) => boolean;
  action?: (context: any) => void;
};

class StateMachineBuilder<TState extends string, TEvent extends string> {
  // Add state to machine
  addState(config: StateConfig<TState, TEvent>): this;

  // Add transition between states
  addTransition(config: TransitionConfig<TState, TEvent>): this;

  // Build the state machine
  build(): StateMachine<TState, TEvent>;
}

class StateMachine<TState extends string, TEvent extends string> {
  // Send event to machine
  send(event: TEvent, context?: any): boolean;

  // Get current state
  getCurrentState(): TState;

  // Check if transition is possible
  canTransition(event: TEvent): boolean;

  // Get machine status
  getStatus(): MachineStatus<TState, TEvent>;
}

type MachineStatus<TState, TEvent> = {
  currentState: TState;
  availableEvents: TEvent[];
  history: Array<{
    from: TState;
    to: TState;
    event: TEvent;
    timestamp: number;
  }>;
};
```

### Requirements

1. State Management:
    - Define states and transitions
    - Handle enter/exit actions
    - Track current state
    - Maintain history

2. Transition Logic:
    - Guard conditions
    - Transition actions
    - Event handling
    - State validation

3. Type Safety:
    - Strict state types
    - Valid transitions only
    - Type-safe events
    - Context typing

### Edge Cases to Handle

- Invalid transitions
- Missing states
- Circular transitions
- Guard failures
- Action errors
- Unreachable states
- Dead-end states
- Race conditions

### Example

```typescript
type DocumentState = 'draft' | 'review' | 'approved' | 'published';
type DocumentEvent = 'submit' | 'approve' | 'reject' | 'publish';

const builder = new StateMachineBuilder<DocumentState, DocumentEvent>();

// Define states
builder
  .addState({ name: 'draft', initial: true })
  .addState({ name: 'review' })
  .addState({ name: 'approved' })
  .addState({ name: 'published', final: true });

// Define transitions
builder
  .addTransition({
    from: 'draft',
    to: 'review',
    event: 'submit',
    guard: (doc) => doc.content.length > 0
  })
  .addTransition({
    from: 'review',
    to: 'approved',
    event: 'approve',
    action: (doc) => doc.approvedAt = new Date()
  })
  .addTransition({
    from: 'review',
    to: 'draft',
    event: 'reject'
  })
  .addTransition({
    from: 'approved',
    to: 'published',
    event: 'publish'
  });

const machine = builder.build();

// Use the machine
const doc = { content: 'Hello', approvedAt: null };

machine.send('submit', doc);  // true
console.log(machine.getCurrentState());  // 'review'

console.log(machine.getStatus());
// {
//   currentState: 'review',
//   availableEvents: ['approve', 'reject'],
//   history: [
//     {
//       from: 'draft',
//       to: 'review',
//       event: 'submit',
//       timestamp: 1621234567890
//     }
//   ]
// }
```

## Notes

This exercise tests your ability to:
- Implement state machines
- Ensure type safety
- Handle complex transitions
- Manage state history
- Validate state flows

Consider:
- State validation
- Transition safety
- Performance implications
- Memory usage
- Type system limits

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Parallel states
2. Hierarchical states
3. Async transitions
4. State persistence
5. Transition hooks
6. State visualization
7. History states
8. State snapshots

## Real-World Applications

This functionality is commonly used in:
- Workflow engines
- Document processing
- Order management
- Game logic
- UI navigation
- Process automation
- Form wizards
- Authentication flows
