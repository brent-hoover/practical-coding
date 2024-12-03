# Route Handler Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - HTTP concepts
    - URL parsing
    - Basic error handling

## Problem Description

Implement a route handler that can match HTTP requests to handlers, parse URL parameters, and handle query strings. This is a fundamental pattern used in web frameworks for routing incoming requests to appropriate handlers.

### Function Signature
```typescript
type RouteHandler = (
  req: Request,
  params: Record<string, string>,
  query: Record<string, string>
) => Promise<Response>;

type Route = {
  path: string;          // e.g., '/users/:id'
  method: string;        // 'GET', 'POST', etc.
  handler: RouteHandler;
};

class Router {
  constructor();

  // Add route
  add(method: string, path: string, handler: RouteHandler): void;

  // Match request to route
  match(method: string, path: string): RouteMatch | null;

  // Handle request
  handle(req: Request): Promise<Response>;

  // List registered routes
  getRoutes(): Route[];
}

type RouteMatch = {
  handler: RouteHandler;
  params: Record<string, string>;
  query: Record<string, string>;
};
```

### Requirements

1. Route Management:
    - Route registration
    - Path matching
    - Method matching
    - Handler execution

2. Parameter Handling:
    - URL parameters
    - Query strings
    - Optional parameters
    - Type coercion

3. Error Handling:
    - Route not found
    - Method not allowed
    - Invalid parameters
    - Handler errors

### Edge Cases to Handle

- Multiple matching routes
- Invalid paths
- Malformed URLs
- Missing parameters
- Invalid methods
- Nested parameters
- Special characters
- Trailing slashes

### Example

```typescript
// Create router
const router = new Router();

// Add routes
router.add('GET', '/users', async (req, params, query) => {
  const page = Number(query.page) || 1;
  return new Response(JSON.stringify({
    users: await getUsers(page)
  }));
});

router.add('GET', '/users/:id', async (req, params, query) => {
  const user = await getUser(params.id);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  return new Response(JSON.stringify(user));
});

router.add('POST', '/users', async (req, params, query) => {
  const body = await req.json();
  const user = await createUser(body);
  return new Response(JSON.stringify(user), { status: 201 });
});

// Handle request
const req = new Request('http://api.example.com/users/123?fields=name,email');
const response = await router.handle(req);

// List routes
console.log(router.getRoutes());
// [
//   { method: 'GET', path: '/users' },
//   { method: 'GET', path: '/users/:id' },
//   { method: 'POST', path: '/users' }
// ]
```

## Notes

This exercise tests your ability to:
- Handle HTTP routing
- Parse URLs
- Work with parameters
- Manage request flow
- Handle errors

Consider:
- Route matching efficiency
- Parameter extraction
- Error handling
- Request flow
- Response formatting

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Regular expression routes
2. Route groups
3. Middleware support
4. Route priorities
5. Response caching
6. Route validation
7. Request logging
8. Custom parameter types

## Real-World Applications

This functionality is commonly used in:
- Web frameworks
- API servers
- Proxy servers
- Mock servers
- Testing tools
- API gateways
- Static file servers
- Development servers
