# Service Locator Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Dependency injection concepts
    - Lifecycle management
    - Error handling patterns

## Problem Description

Implement a service locator that can register, resolve, and manage service dependencies with proper lifecycle management. This is commonly used for dependency injection and service management in applications.

### Function Signature
```typescript
type ServiceLifetime = 'singleton' | 'transient' | 'scoped';

type ServiceDescriptor<T> = {
  implementation: new (...args: any[]) => T;
  lifetime: ServiceLifetime;
  dependencies?: string[];
  factory?: (...args: any[]) => Promise<T> | T;
  initialize?: (instance: T) => Promise<void>;
  dispose?: (instance: T) => Promise<void>;
};

class ServiceLocator {
  constructor(options?: {
    parent?: ServiceLocator;
    strict?: boolean;
  });

  // Register a service
  register<T>(
    name: string,
    descriptor: ServiceDescriptor<T>
  ): void;

  // Resolve a service
  resolve<T>(name: string): Promise<T>;

  // Create a new scope
  createScope(): ServiceLocator;

  // Dispose of all services
  dispose(): Promise<void>;

  // Get registration info
  getRegistrations(): ServiceInfo[];
}

type ServiceInfo = {
  name: string;
  lifetime: ServiceLifetime;
  instances: number;
  status: 'registered' | 'resolving' | 'resolved' | 'disposed';
};
```

### Requirements

1. Service Management:
    - Register service definitions
    - Resolve service instances
    - Handle dependencies
    - Support multiple lifetimes

2. Lifecycle Control:
    - Service initialization
    - Proper disposal
    - Scope management
    - Parent/child relationships

3. Error Handling:
    - Circular dependency detection
    - Missing dependency handling
    - Initialization failures
    - Disposal errors

### Edge Cases to Handle

- Circular dependencies
- Disposal order
- Scope cleanup
- Factory failures
- Missing dependencies
- Invalid registrations
- Concurrent resolution
- Memory leaks

### Example

```typescript
const locator = new ServiceLocator();

// Register services
locator.register<Database>('database', {
  implementation: DatabaseService,
  lifetime: 'singleton',
  async initialize(instance) {
    await instance.connect();
  },
  async dispose(instance) {
    await instance.disconnect();
  }
});

locator.register<UserService>('userService', {
  implementation: UserService,
  lifetime: 'scoped',
  dependencies: ['database']
});

// Create a scope
const scope = locator.createScope();

// Resolve services
const userService = await scope.resolve<UserService>('userService');

// Check registrations
console.log(scope.getRegistrations());
// [
//   {
//     name: 'database',
//     lifetime: 'singleton',
//     instances: 1,
//     status: 'resolved'
//   },
//   {
//     name: 'userService',
//     lifetime: 'scoped',
//     instances: 1,
//     status: 'resolved'
//   }
// ]

// Clean up
await scope.dispose();
```

## Notes

This exercise tests your ability to:
- Manage service lifecycles
- Handle dependencies
- Implement scoping
- Manage resource cleanup
- Handle concurrent operations

Consider:
- Memory management
- Resolution performance
- Disposal ordering
- Thread safety
- Error propagation

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Lazy initialization
2. Service decorators
3. Resolution interceptors
4. Service replacement
5. Dependency validation
6. Service groups
7. Async factories
8. Service monitoring

## Real-World Applications

This functionality is commonly used in:
- Dependency injection
- Application containers
- Service management
- Testing frameworks
- Module systems
- Plugin architectures
- Microservice composition
- Application bootstrapping
