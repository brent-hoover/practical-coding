# HTTP Client Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - HTTP protocol concepts
    - Promise handling
    - Error handling

## Problem Description

Implement an HTTP client that can make requests with different methods, handle headers, and process responses. This is a fundamental pattern used for making HTTP requests to external services and APIs.

### Function Signature
```typescript
type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
};

type Response = {
  status: number;
  headers: Record<string, string>;
  body: unknown;
};

class HttpClient {
  constructor(options?: {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
  });

  // Make HTTP request
  request(
    url: string,
    options?: RequestOptions
  ): Promise<Response>;

  // Convenience methods
  get(url: string, options?: RequestOptions): Promise<Response>;
  post(url: string, options?: RequestOptions): Promise<Response>;
  put(url: string, options?: RequestOptions): Promise<Response>;
  delete(url: string, options?: RequestOptions): Promise<Response>;

  // Get client metrics
  getMetrics(): ClientMetrics;
}

type ClientMetrics = {
  requests: number;
  errors: number;
  avgLatency: number;
};
```

### Requirements

1. Request Handling:
    - Multiple HTTP methods
    - Header management
    - Body serialization
    - URL handling

2. Response Processing:
    - Status codes
    - Header parsing
    - Body deserialization
    - Error handling

3. Features:
    - Timeouts
    - Retries
    - Metrics tracking
    - Base URL support

### Edge Cases to Handle

- Network errors
- Timeout handling
- Invalid URLs
- Response types
- Status codes
- Retry scenarios
- Header casing
- Body formats

### Example

```typescript
// Create client
const client = new HttpClient({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
});

// GET request
const getResponse = await client.get('/users', {
  headers: {
    'Accept': 'application/json'
  }
});

console.log(getResponse);
// {
//   status: 200,
//   headers: {
//     'content-type': 'application/json',
//     'content-length': '123'
//   },
//   body: [{ id: 1, name: 'John' }]
// }

// POST request with body
const postResponse = await client.post('/users', {
  body: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});

// Custom request
const response = await client.request('/custom', {
  method: 'PATCH',
  headers: { 'X-Custom': 'value' },
  body: { data: 'value' },
  timeout: 5000,
  retries: 3
});

// Check metrics
console.log(client.getMetrics());
// {
//   requests: 3,
//   errors: 0,
//   avgLatency: 123.45
// }
```

## Notes

This exercise tests your ability to:
- Handle HTTP protocol
- Process requests/responses
- Manage headers
- Handle errors
- Track metrics

Consider:
- URL formatting
- Header normalization
- Error handling
- Timeout management
- Retry strategies

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Request interceptors
2. Response caching
3. Request queuing
4. Progress tracking
5. Request cancellation
6. Authentication
7. Cookie handling
8. Compression

## Real-World Applications

This functionality is commonly used in:
- API clients
- Web applications
- Service integration
- Data fetching
- API testing
- Monitoring tools
- Automation scripts
- SDK development
