# Event Emitter Patterns Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Event handling concepts

## Problem Description

Implement common event emitter patterns for handling events, managing subscriptions, and dealing with event-driven scenarios. This is fundamental for building event-driven applications in Node.js.

### Function Signature
```typescript
type EventCallback = (...args: any[]) => void;
type EventOptions = {
  once?: boolean;
  maxListeners?: number;
};

class EventHandler {
  constructor(options?: EventOptions);

  // Add event listener
  on(event: string, callback: EventCallback): void;

  // Add one-time event listener
  once(event: string, callback: EventCallback): void;

  // Remove event listener
  off(event: string, callback: EventCallback): void;

  // Emit event
  emit(event: string, ...args: any[]): boolean;

  // Get event info
  getEventInfo(event: string): EventInfo;
}

type EventInfo = {
  listenerCount: number;
  maxListeners: number;
  called: number;
};
```

### Requirements

1. Event Management:
    - Register listeners
    - Remove listeners
    - Emit events
    - Handle errors

2. Listener Control:
    - One-time listeners
    - Max listeners
    - Listener removal
    - Duplicate prevention

3. Error Handling:
    - Error events
    - Invalid listeners
    - Missing events
    - Resource cleanup

### Example

```typescript
// Create event handler
const events = new EventHandler({
  maxListeners: 10
});

// Add listeners
events.on('data', (data) => {
  console.log('Data received:', data);
});

events.once('start', () => {
  console.log('Started - this runs only once');
});

// Handle errors
events.on('error', (error) => {
  console.error('Error occurred:', error);
});

// Emit events
events.emit('start');
events.emit('data', { id: 1, name: 'test' });

// Check event info
console.log(events.getEventInfo('data'));
// {
//   listenerCount: 1,
//   maxListeners: 10,
//   called: 1
// }
```

## Notes

This exercise tests your ability to:
- Handle event patterns
- Manage subscriptions
- Handle event errors
- Clean up resources
- Track event usage

Consider:
- Memory leaks
- Error propagation
- Event ordering
- Resource cleanup
- Performance impact

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Event namespaces
2. Wildcard events
3. Event history
4. Async events
5. Priority events

## Real-World Applications

This functionality is commonly used in:
- UI frameworks
- Server applications
- Message systems
- Plugin systems
- API servers
- Monitoring tools
- WebSocket servers
- Process communication
