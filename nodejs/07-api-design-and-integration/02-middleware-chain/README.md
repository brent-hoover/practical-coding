# Middleware Chain Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - HTTP concepts
    - Function composition
    - Error handling

## Problem Description

Implement a middleware chain that can process HTTP requests through a series of middleware functions, handle errors, and pass context between middleware. This is a fundamental pattern used in web frameworks for request processing and cross-cutting concerns.

### Function Signature
```typescript
type Context = {
  req: Request;
  res: Response;
  state: Record<string, unknown>;
};

type Middleware = (
  ctx: Context,
  next: () => Promise<void>
) => Promise<void>;

class MiddlewareChain {
  constructor();

  // Add middleware to chain
  use(middleware: Middleware): this;

  // Process request through middleware chain
  handle(req: Request): Promise<Response>;

  // Get chain info
  getInfo(): ChainInfo;
}

type ChainInfo = {
  middlewareCount: number;
  executionOrder: string[];
  lastError?: Error;
};
```

### Requirements

1. Chain Management:
    - Middleware registration
    - Execution order
    - Context passing
    - Chain composition

2. Error Handling:
    - Error propagation
    - Error recovery
    - Chain interruption
    - Error middleware

3. State Management:
    - Context state
    - Request/response access
    - State isolation
    - Clean up

### Edge Cases to Handle

- Chain interruption
- Error bubbling
- Circular dependencies
- Missing next() calls
- Context mutation
- Async errors
- Multiple responses
- Resource cleanup

### Example

```typescript
// Create middleware chain
const chain = new MiddlewareChain();

// Add logging middleware
chain.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  
  await next();
  
  const ms = Date.now() - start;
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}ms`);
});

// Add auth middleware
chain.use(async (ctx, next) => {
  const token = ctx.req.headers.get('Authorization');
  if (!token) {
    ctx.res = new Response('Unauthorized', { status: 401 });
    return;
  }
  
  ctx.state.user = await verifyToken(token);
  await next();
});

// Add error handling
chain.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.res = new Response(error.message, { status: 500 });
  }
});

// Handle request
const req = new Request('http://example.com/api');
const res = await chain.handle(req);

// Check chain info
console.log(chain.getInfo());
// {
//   middlewareCount: 3,
//   executionOrder: ['logger', 'auth', 'error'],
//   lastError: undefined
// }
```

## Notes

This exercise tests your ability to:
- Implement middleware pattern
- Handle async operations
- Manage request context
- Handle errors
- Maintain state

Consider:
- Execution order
- Error propagation
- State isolation
- Resource cleanup
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Conditional middleware
2. Middleware groups
3. Timing tracking
4. Dependency injection
5. Middleware removal
6. Chain cloning
7. Middleware priority
8. Context validation

## Real-World Applications

This functionality is commonly used in:
- Web frameworks
- API servers
- Request processing
- Authentication
- Logging systems
- Error handling
- Request validation
- Response formatting
