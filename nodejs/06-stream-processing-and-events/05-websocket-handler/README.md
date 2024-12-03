# WebSocket Handler Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - WebSocket protocol
    - Connection management
    - Error handling

## Problem Description

Implement a WebSocket handler that can manage connections, route messages, and handle reconnection scenarios. This is commonly used in real-time applications for bidirectional communication between clients and servers.

### Function Signature
```typescript
type ConnectionOptions = {
  reconnect?: boolean;
  maxRetries?: number;
  backoff?: 'linear' | 'exponential';
  pingInterval?: number;     // Heartbeat interval
};

type Route = {
  path: string;
  handler: (message: any, context: ConnectionContext) => void;
};

class WebSocketHandler {
  constructor(options?: ConnectionOptions);

  // Connect to WebSocket server
  connect(url: string): Promise<void>;

  // Add message route
  addRoute(route: Route): void;

  // Send message
  send(path: string, data: unknown): Promise<void>;

  // Close connection
  close(code?: number, reason?: string): Promise<void>;

  // Get connection status
  getStatus(): ConnectionStatus;
}

type ConnectionContext = {
  connectionId: string;
  connected: boolean;
  lastMessageAt: number;
  metadata: Record<string, unknown>;
};

type ConnectionStatus = {
  connected: boolean;
  retries: number;
  messagesSent: number;
  messagesReceived: number;
  lastPing: number;
};
```

### Requirements

1. Connection Management:
    - Connection establishment
    - Reconnection handling
    - Ping/pong (heartbeat)
    - Connection cleanup

2. Message Routing:
    - Route registration
    - Message handling
    - Path matching
    - Context tracking

3. Error Handling:
    - Connection failures
    - Message failures
    - Timeout handling
    - Cleanup procedures

### Edge Cases to Handle

- Connection drops
- Message timeouts
- Invalid messages
- Race conditions
- Memory leaks
- Route conflicts
- Reconnection limits
- Server errors

### Example

```typescript
// Create handler
const ws = new WebSocketHandler({
  reconnect: true,
  maxRetries: 5,
  backoff: 'exponential',
  pingInterval: 30000  // 30 seconds
});

// Add routes
ws.addRoute({
  path: 'chat.message',
  handler: (message, context) => {
    console.log(`Message from ${context.connectionId}:`, message);
  }
});

ws.addRoute({
  path: 'user.status',
  handler: (status, context) => {
    console.log(`User ${status.userId} is ${status.status}`);
  }
});

// Connect
await ws.connect('wss://example.com/chat');

// Send message
await ws.send('chat.message', {
  userId: '123',
  text: 'Hello, world!'
});

// Check status
console.log(ws.getStatus());
// {
//   connected: true,
//   retries: 0,
//   messagesSent: 1,
//   messagesReceived: 0,
//   lastPing: 1621234567890
// }

// Close connection
await ws.close(1000, 'Normal closure');
```

## Notes

This exercise tests your ability to:
- Handle WebSocket protocol
- Manage connections
- Route messages
- Handle errors
- Track connection state

Consider:
- Connection stability
- Message reliability
- Error recovery
- Memory management
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Message queuing
2. Compression
3. Binary messages
4. Subscription handling
5. Message batching
6. Rate limiting
7. Connection pools
8. Message acknowledgment

## Real-World Applications

This functionality is commonly used in:
- Chat applications
- Real-time dashboards
- Game servers
- Live updates
- Collaborative tools
- Monitoring systems
- Trading platforms
- IoT devices
