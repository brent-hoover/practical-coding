# Response Builder Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - HTTP concepts
    - Content negotiation
    - Error handling patterns

## Problem Description

Implement a response builder that can construct HTTP responses with appropriate status codes, headers, and content types. This is commonly used in APIs to ensure consistent response formatting and proper HTTP protocol adherence.

### Function Signature
```typescript
type ResponseOptions = {
  formatters?: Record<string, ResponseFormatter>;
  transforms?: ResponseTransform[];
  defaultContentType?: string;
};

type ResponseFormatter = (data: unknown) => string;
type ResponseTransform = (res: Response) => Promise<Response>;

class ResponseBuilder {
  constructor(options?: ResponseOptions);

  // Create success response
  success<T>(
    data: T,
    options?: ResponseBuilderOptions
  ): Response;

  // Create error response
  error(
    error: Error | string,
    status?: number
  ): Response;

  // Create redirect response
  redirect(
    url: string,
    status?: 301 | 302 | 303 | 307 | 308
  ): Response;

  // Add response formatter
  addFormatter(
    contentType: string,
    formatter: ResponseFormatter
  ): void;

  // Add response transform
  addTransform(transform: ResponseTransform): void;
}

type ResponseBuilderOptions = {
  status?: number;
  headers?: Record<string, string>;
  contentType?: string;
};
```

### Requirements

1. Response Creation:
    - Success responses
    - Error responses
    - Redirects
    - Status codes

2. Content Handling:
    - Content negotiation
    - Content formatting
    - Content encoding
    - MIME types

3. Header Management:
    - Standard headers
    - Custom headers
    - Cookie handling
    - Cache control

### Edge Cases to Handle

- Invalid status codes
- Unknown content types
- Formatter errors
- Transform errors
- Invalid headers
- Large responses
- Encoding issues
- Invalid URLs

### Example

```typescript
// Create builder
const builder = new ResponseBuilder({
  formatters: {
    'application/json': JSON.stringify,
    'text/xml': createXmlFormatter()
  },
  transforms: [
    addCorsHeaders,
    addSecurityHeaders
  ],
  defaultContentType: 'application/json'
});

// Success response
const successRes = builder.success(
  {
    id: 123,
    name: 'Example'
  },
  {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
);

// Error response
const errorRes = builder.error(
  new Error('Invalid input'),
  400
);

// Redirect response
const redirectRes = builder.redirect(
  'https://example.com/new-location',
  301
);

// Custom formatter
builder.addFormatter('application/yaml', 
  data => YAML.stringify(data)
);

// Response transform
builder.addTransform(async (res) => {
  res.headers.set('X-Response-Time', '100ms');
  return res;
});

// Using with content negotiation
const acceptHeader = req.headers.get('Accept');
const response = builder.success(
  data,
  { contentType: acceptHeader }
);
```

## Notes

This exercise tests your ability to:
- Handle HTTP responses
- Format different content types
- Manage HTTP headers
- Transform responses
- Handle errors

Consider:
- Content negotiation
- Header management
- Status code selection
- Error formatting
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Response compression
2. Response streaming
3. Content negotiation
4. ETags support
5. Rate limit headers
6. Response caching
7. Link headers
8. Schema validation

## Real-World Applications

This functionality is commonly used in:
- API servers
- Web frameworks
- Proxy servers
- API gateways
- Content servers
- Microservices
- REST APIs
- GraphQL servers
