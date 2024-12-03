# RPC Framework Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Serialization
    - Proxy patterns
    - Network programming

## Problem Description

Implement a Remote Procedure Call (RPC) framework that can register methods, handle remote calls, and manage serialization. This is commonly used for distributed systems communication and service-to-service interactions.

### Function Signature
```typescript
type RpcOptions = {
  timeout?: number;
  serializer?: Serializer;
  transport?: Transport;
  errorHandler?: ErrorHandler;
};

type RpcMethod = {
  name: string;
  parameters: ParameterDefinition[];
  returnType: string;
};

class RpcFramework {
  constructor(options?: RpcOptions);

  // Register remote method
  register<T>(
    name: string,
    implementation: T,
    metadata?: MethodMetadata
  ): void;

  // Create client proxy
  createClient<T>(
    interface: new () => T
  ): T;

  // Handle incoming call
  handleCall(
    methodName: string,
    args: unknown[]
  ): Promise<unknown>;

  // Get framework metrics
  getMetrics(): RpcMetrics;
}

type RpcMetrics = {
  registeredMethods: number;
  activeClients: number;
  callsProcessed: number;
  errors: number;
};
```

### Requirements

1. Method Management:
    - Method registration
    - Parameter validation
    - Return type handling
    - Proxy generation

2. Call Handling:
    - Argument serialization
    - Remote invocation
    - Result handling
    - Error propagation

3. Transport Layer:
    - Protocol abstraction
    - Connection management
    - Timeout handling
    - Retry logic

### Edge Cases to Handle

- Type mismatches
- Network failures
- Timeout scenarios
- Circular references
- Invalid methods
- Parameter errors
- Serialization issues
- Concurrent calls

### Example

```typescript
// Define service interface
interface UserService {
  getUser(id: string): Promise<User>;
  createUser(data: UserData): Promise<User>;
}

// Create RPC framework
const rpc = new RpcFramework({
  timeout: 5000,
  serializer: new JSONSerializer(),
  transport: new HTTPTransport()
});

// Register service implementation
rpc.register<UserService>('UserService', {
  async getUser(id: string) {
    return await database.findUser(id);
  },
  async createUser(data: UserData) {
    return await database.createUser(data);
  }
});

// Create client proxy
const userService = rpc.createClient<UserService>(UserService);

// Use remote service
try {
  const user = await userService.getUser('123');
  console.log(user);
} catch (error) {
  console.error('RPC call failed:', error);
}

// Check metrics
console.log(rpc.getMetrics());
// {
//   registeredMethods: 2,
//   activeClients: 1,
//   callsProcessed: 1,
//   errors: 0
// }
```

## Notes

This exercise tests your ability to:
- Implement RPC patterns
- Handle serialization
- Manage remote calls
- Use proxy patterns
- Handle errors

Consider:
- Type safety
- Error handling
- Performance impact
- Network reliability
- Security implications

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Bidirectional RPC
2. Service discovery
3. Load balancing
4. Circuit breaking
5. Call tracing
6. Authentication
7. Compression
8. Caching

## Real-World Applications

This functionality is commonly used in:
- Microservices
- Distributed systems
- Service integration
- API frameworks
- Plugin systems
- Cloud services
- Remote management
- Service meshes
