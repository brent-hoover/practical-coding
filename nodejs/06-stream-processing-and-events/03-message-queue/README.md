# Message Queue Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Queue data structures
    - Pub/sub patterns
    - Delivery guarantees

## Problem Description

Implement a message queue that supports topics, handles message delivery guarantees, and manages consumer groups. This is commonly used for decoupling services, handling asynchronous operations, and managing distributed workloads.

### Function Signature
```typescript
type QueueOptions = {
  maxSize?: number;           // Maximum messages per topic
  retentionMs?: number;       // Message retention time
  deliveryAttempts?: number;  // Retry attempts
};

type Message<T> = {
  id: string;
  topic: string;
  data: T;
  timestamp: number;
  attempts?: number;
};

type Consumer<T> = {
  groupId: string;
  handler: (message: Message<T>) => Promise<void>;
};

class MessageQueue {
  constructor(options?: QueueOptions);

  // Publish message to topic
  publish<T>(
    topic: string,
    data: T,
    options?: { priority?: number }
  ): Promise<string>;  // Returns message ID

  // Subscribe to topic
  subscribe<T>(
    topic: string,
    consumer: Consumer<T>
  ): () => void;

  // Acknowledge message processing
  acknowledge(messageId: string): Promise<void>;

  // Get queue metrics
  getMetrics(): QueueMetrics;
}

type QueueMetrics = {
  topics: Record<string, {
    messages: number;
    consumers: number;
    processed: number;
    failed: number;
  }>;
  totalMessages: number;
  messageRate: number;
};
```

### Requirements

1. Message Handling:
    - Topic-based routing
    - Message persistence
    - Delivery ordering
    - Priority support

2. Consumer Management:
    - Consumer groups
    - Message acknowledgment
    - Retry handling
    - Failed message handling

3. Queue Management:
    - Size limits
    - Message retention
    - Performance metrics
    - Error handling

### Edge Cases to Handle

- Queue full
- Consumer failures
- Message expiration
- Duplicate messages
- Order preservation
- Memory pressure
- Retry exhaustion
- Topic deletion

### Example

```typescript
// Create queue
const queue = new MessageQueue({
  maxSize: 1000,
  retentionMs: 3600000,  // 1 hour
  deliveryAttempts: 3
});

// Define message type
interface OrderMessage {
  orderId: string;
  items: string[];
  total: number;
}

// Subscribe to topic
const unsubscribe = queue.subscribe<OrderMessage>(
  'orders',
  {
    groupId: 'order-processor',
    handler: async (message) => {
      await processOrder(message.data);
      await queue.acknowledge(message.id);
    }
  }
);

// Publish message
const messageId = await queue.publish<OrderMessage>(
  'orders',
  {
    orderId: '123',
    items: ['item1', 'item2'],
    total: 29.99
  },
  { priority: 1 }
);

// Check metrics
console.log(queue.getMetrics());
// {
//   topics: {
//     orders: {
//       messages: 1,
//       consumers: 1,
//       processed: 0,
//       failed: 0
//     }
//   },
//   totalMessages: 1,
//   messageRate: 1
// }

// Cleanup
unsubscribe();
```

## Notes

This exercise tests your ability to:
- Implement queue patterns
- Manage message delivery
- Handle consumer groups
- Track performance metrics
- Ensure reliability

Consider:
- Message ordering
- Memory management
- Error handling
- Performance impact
- Scaling issues

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Dead letter queues
2. Message filtering
3. Topic patterns
4. Message schemas
5. Consumer backpressure
6. Message batching
7. Priority queues
8. Message tracking

## Real-World Applications

This functionality is commonly used in:
- Service communication
- Task processing
- Event handling
- Workload distribution
- Async operations
- Job queues
- Notification systems
- Log processing
