# TCP Server Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - TCP/IP concepts
    - Network programming
    - Buffer handling

## Problem Description

Implement a TCP server that can handle multiple client connections, manage data streams, and process custom protocols. This is commonly used for building network services, custom protocols, and low-level network applications.

### Function Signature
```typescript
type ServerOptions = {
  port: number;
  host?: string;
  backlog?: number;
  keepAlive?: boolean;
  timeout?: number;
};

type ClientConnection = {
  id: string;
  address: string;
  connected: number;
  bytesReceived: number;
  bytesSent: number;
};

class TcpServer {
  constructor(options: ServerOptions);

  // Start server
  start(): Promise<void>;

  // Stop server
  stop(): Promise<void>;

  // Send data to client
  send(clientId: string, data: Buffer): Promise<void>;

  // Broadcast to all clients
  broadcast(data: Buffer, exclude?: string[]): Promise<void>;

  // Get server metrics
  getMetrics(): ServerMetrics;
}

type ServerMetrics = {
  connections: number;
  bytesReceived: number;
  bytesSent: number;
  uptime: number;
};
```

### Requirements

1. Connection Management:
    - Client connections
    - Connection tracking
    - Socket timeouts
    - Cleanup handling

2. Data Handling:
    - Buffer processing
    - Stream management
    - Data framing
    - Error detection

3. Server Features:
    - Multiple clients
    - Broadcasting
    - Keep-alive
    - Metrics tracking

### Edge Cases to Handle

- Connection drops
- Partial messages
- Buffer overflow
- High concurrency
- Network errors
- Memory leaks
- Socket timeouts
- Invalid data

### Example

```typescript
// Create server
const server = new TcpServer({
  port: 3000,
  host: 'localhost',
  backlog: 50,
  keepAlive: true,
  timeout: 30000
});

// Handle client connection
server.on('connection', (client: ClientConnection) => {
  console.log(`Client connected: ${client.id}`);

  // Handle data
  server.on('data', (clientId: string, data: Buffer) => {
    // Echo server example
    server.send(clientId, data);
  });

  // Handle client disconnection
  server.on('disconnect', (clientId: string) => {
    console.log(`Client disconnected: ${clientId}`);
  });
});

// Handle errors
server.on('error', (error: Error) => {
  console.error('Server error:', error);
});

// Start server
await server.start();
console.log('Server running on tcp://localhost:3000');

// Send broadcast
await server.broadcast(Buffer.from('Server broadcast'));

// Check metrics
console.log(server.getMetrics());
// {
//   connections: 2,
//   bytesReceived: 1024,
//   bytesSent: 2048,
//   uptime: 300
// }

// Stop server
await server.stop();
```

## Notes

This exercise tests your ability to:
- Handle TCP connections
- Process binary data
- Manage socket lifecycle
- Handle concurrency
- Track metrics

Consider:
- Buffer management
- Connection cleanup
- Error propagation
- Memory usage
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. TLS support
2. Custom protocols
3. Connection pools
4. Load balancing
5. Data compression
6. Flow control
7. Backpressure handling
8. Connection recovery

## Real-World Applications

This functionality is commonly used in:
- Network services
- Custom protocols
- Game servers
- Chat systems
- Proxy servers
- Monitoring tools
- IoT devices
- Data collection
