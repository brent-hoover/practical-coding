# WebSocket Server Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - WebSocket protocol
    - Event handling
    - Basic networking

## Problem Description

Implement a WebSocket server that can handle connections, manage rooms, and broadcast messages. This is commonly used for real-time communication in applications like chat systems and live updates.

### Function Signature
```typescript
type ServerOptions = {
  port: number;
  path?: string;
  maxClients?: number;
  pingInterval?: number;
};

type Room = {
  name: string;
  clients: Set<WebSocketClient>;
};

class WebSocketServer {
  constructor(options: ServerOptions);

  // Start server
  start(): Promise<void>;

  // Stop server
  stop(): Promise<void>;

  // Create room
  createRoom(name: string): Room;

  // Broadcast to room
  broadcast(
    room: string,
    message: unknown,
    exclude?: WebSocketClient
  ): void;

  // Get server stats
  getStats(): ServerStats;
}

type ServerStats = {
  connections: number;
  rooms: number;
  messagesSent: number;
  messagesReceived: number;
};
```

### Requirements

1. Connection Management:
    - Connection handling
    - Client tracking
    - Ping/pong
    - Disconnection cleanup

2. Room Management:
    - Room creation
    - Client joining/leaving
    - Message broadcasting
    - Room cleanup

3. Message Handling:
    - Message parsing
    - Message validation
    - Broadcasting
    - Error handling

### Edge Cases to Handle

- Connection drops
- Invalid messages
- Room overflow
- Server shutdown
- Reconnection
- Memory leaks
- Protocol errors
- Concurrent access

### Example

```typescript
// Create server
const server = new WebSocketServer({
  port: 8080,
  path: '/ws',
  maxClients: 1000,
  pingInterval: 30000  // 30 seconds
});

// Handle connections
server.on('connection', (client) => {
  console.log('Client connected:', client.id);

  // Handle messages
  client.on('message', (data) => {
    const message = JSON.parse(data);
    
    // Handle different message types
    switch (message.type) {
      case 'join':
        const room = server.createRoom(message.room);
        room.clients.add(client);
        break;
      
      case 'chat':
        server.broadcast(message.room, {
          type: 'chat',
          from: client.id,
          text: message.text
        });
        break;
    }
  });

  // Handle disconnection
  client.on('close', () => {
    console.log('Client disconnected:', client.id);
  });
});

// Start server
await server.start();
console.log('Server running on ws://localhost:8080/ws');

// Check stats
console.log(server.getStats());
// {
//   connections: 1,
//   rooms: 1,
//   messagesSent: 1,
//   messagesReceived: 2
// }

// Stop server
await server.stop();
```

## Notes

This exercise tests your ability to:
- Handle WebSocket protocol
- Manage connections
- Implement broadcasting
- Handle room logic
- Track server state

Consider:
- Connection lifecycle
- Message ordering
- Error propagation
- Memory management
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Authentication
2. Message history
3. Client limits
4. Room persistence
5. Message filtering
6. Presence tracking
7. Custom protocols
8. Load balancing

## Real-World Applications

This functionality is commonly used in:
- Chat applications
- Real-time games
- Live dashboards
- Collaborative tools
- Notification systems
- Live updates
- Monitoring systems
- Interactive applications
