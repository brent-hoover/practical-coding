# Session Store Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Session management
    - Data partitioning
    - Expiration handling

## Problem Description

Implement a session store that can manage user sessions across multiple servers, handle expiration, and provide efficient data partitioning. This is commonly used in web applications to manage user state and authentication data.

### Function Signature
```typescript
type SessionData = Record<string, unknown>;

type SessionOptions = {
  ttl?: number;              // Session lifetime in ms
  rolling?: boolean;         // Reset TTL on access
  sameSite?: boolean;        // Restrict to same site
  partitions?: number;       // Number of partitions
};

class SessionStore {
  constructor(options: SessionOptions);

  // Create new session
  create(data: SessionData): Promise<string>;  // Returns session ID

  // Get session data
  get(sessionId: string): Promise<SessionData | null>;

  // Update session data
  set(sessionId: string, data: SessionData): Promise<void>;

  // Delete session
  destroy(sessionId: string): Promise<void>;

  // Touch session (update TTL)
  touch(sessionId: string): Promise<void>;

  // Clean expired sessions
  cleanup(): Promise<number>;  // Returns cleaned count

  // Get store status
  getStatus(): SessionStoreStatus;
}

type SessionStoreStatus = {
  activeSessions: number;
  expirations: number;
  partitionSizes: number[];
  lastCleanup: number;
};
```

### Requirements

1. Session Management:
    - Create sessions
    - Store session data
    - Handle expiration
    - Support partitioning

2. Data Consistency:
    - Atomic operations
    - Cross-partition consistency
    - Expiration accuracy
    - Data integrity

3. Performance:
    - Efficient lookups
    - Quick expiration
    - Partition balancing
    - Memory management

### Edge Cases to Handle

- Concurrent access
- Session expiration
- Invalid sessions
- Cross-partition operations
- Memory pressure
- Race conditions
- Data corruption
- Network partitions

### Example

```typescript
const store = new SessionStore({
  ttl: 3600000,        // 1 hour
  rolling: true,       // Reset TTL on access
  sameSite: true,
  partitions: 4
});

// Create session
const sessionId = await store.create({
  userId: '123',
  role: 'user',
  preferences: {
    theme: 'dark'
  }
});

// Get session data
const session = await store.get(sessionId);
if (session) {
  console.log(session.userId);  // '123'
}

// Update session
await store.set(sessionId, {
  ...session,
  lastAccess: Date.now()
});

// Touch session (extend TTL)
await store.touch(sessionId);

// Clean expired sessions
const cleaned = await store.cleanup();

// Check store status
console.log(store.getStatus());
// {
//   activeSessions: 1,
//   expirations: 0,
//   partitionSizes: [1, 0, 0, 0],
//   lastCleanup: 1621234567890
// }
```

## Notes

This exercise tests your ability to:
- Manage session lifecycles
- Handle distributed data
- Implement partitioning
- Ensure data consistency
- Optimize performance

Consider:
- Memory efficiency
- Cleanup strategies
- Partition balance
- Security implications
- Scalability issues

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Session encryption
2. Cross-partition search
3. Session migration
4. Activity tracking
5. Backup/restore
6. Rate limiting
7. Security policies
8. Event notifications

## Real-World Applications

This functionality is commonly used in:
- Web applications
- Authentication systems
- User state management
- API gateways
- Load balancers
- Distributed systems
- Single sign-on
- Mobile backends
