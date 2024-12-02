# App Bootstrapper Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Dependency management
    - Async initialization
    - Error handling

## Problem Description

Implement an application bootstrapper that can coordinate startup sequence, manage initialization dependencies, and handle graceful shutdown. This is essential for complex applications that need controlled startup and shutdown processes.

### Function Signature
```typescript
type InitPhase = 'config' | 'services' | 'database' | 'server' | 'custom';

type BootstrapStep = {
  name: string;
  phase: InitPhase;
  dependencies?: string[];
  initialize: () => Promise<void>;
  shutdown?: () => Promise<void>;
  timeout?: number;
  critical?: boolean;
};

class AppBootstrapper {
  constructor(options?: {
    logger?: Logger;
    timeout?: number;
  });

  // Register initialization step
  register(step: BootstrapStep): void;

  // Start the application
  start(): Promise<void>;

  // Gracefully shut down
  shutdown(): Promise<void>;

  // Get current status
  getStatus(): BootstrapStatus;
}

type BootstrapStatus = {
  phase: InitPhase;
  completed: string[];
  pending: string[];
  failed: string[];
  uptime: number;
  healthy: boolean;
};
```

### Requirements

1. Startup Management:
    - Phase-based initialization
    - Dependency resolution
    - Parallel execution
    - Timeout handling

2. Shutdown Control:
    - Graceful shutdown
    - Resource cleanup
    - Order management
    - Error handling

3. Health Monitoring:
    - Status tracking
    - Error reporting
    - Health checks
    - Dependency validation

### Edge Cases to Handle

- Initialization failures
- Timeout scenarios
- Circular dependencies
- Partial startup
- Failed shutdown
- Resource leaks
- Concurrent operations
- Recovery procedures

### Example

```typescript
const bootstrapper = new AppBootstrapper();

// Register initialization steps
bootstrapper.register({
  name: 'config',
  phase: 'config',
  initialize: async () => {
    await loadConfiguration();
  }
});

bootstrapper.register({
  name: 'database',
  phase: 'database',
  dependencies: ['config'],
  initialize: async () => {
    await initializeDatabase();
  },
  shutdown: async () => {
    await closeDatabase();
  },
  critical: true
});

bootstrapper.register({
  name: 'httpServer',
  phase: 'server',
  dependencies: ['database'],
  initialize: async () => {
    await startServer();
  },
  shutdown: async () => {
    await stopServer();
  }
});

// Start application
try {
  await bootstrapper.start();
} catch (error) {
  console.error('Startup failed:', error);
  process.exit(1);
}

// Check status
console.log(bootstrapper.getStatus());
// {
//   phase: 'server',
//   completed: ['config', 'database', 'httpServer'],
//   pending: [],
//   failed: [],
//   uptime: 1234,
//   healthy: true
// }

// Graceful shutdown
process.on('SIGTERM', async () => {
  await bootstrapper.shutdown();
  process.exit(0);
});
```

## Notes

This exercise tests your ability to:
- Coordinate async operations
- Manage dependencies
- Handle resource lifecycle
- Implement error recovery
- Monitor system health

Consider:
- Startup performance
- Resource management
- Error propagation
- Health monitoring
- Recovery strategies

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Recovery strategies
2. Health monitoring
3. Dependency graphs
4. Startup profiling
5. Custom phases
6. Hot reload
7. State persistence
8. Cluster coordination

## Real-World Applications

This functionality is commonly used in:
- Server applications
- Microservices
- Database systems
- Message brokers
- Service meshes
- Container orchestration
- Cloud services
- Enterprise applications
