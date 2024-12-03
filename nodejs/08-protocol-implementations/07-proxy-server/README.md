# Proxy Server Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - HTTP/HTTPS protocols
    - Network programming
    - Buffer handling

## Problem Description

Implement a proxy server that can forward requests, modify headers, and cache responses. This is used for request routing, caching, and request/response modification in network applications.

### Function Signature
```typescript
type ProxyOptions = {
  port: number;
  host?: string;
  ssl?: SSLConfig;
  rules?: ProxyRule[];
  cache?: CacheConfig;
};

type ProxyRule = {
  match: string | RegExp;
  target: string;
  modify?: RequestModifier;
};

class ProxyServer {
  constructor(options: ProxyOptions);

  // Start proxy server
  start(): Promise<void>;

  // Stop proxy server
  stop(): Promise<void>;

  // Add proxy rule
  addRule(rule: ProxyRule): void;

  // Get proxy metrics
  getMetrics(): ProxyMetrics;
}

type RequestModifier = {
  headers?: Record<string, string>;
  transform?: (body: Buffer) => Promise<Buffer>;
};

type ProxyMetrics = {
  requests: number;
  cached: number;
  errors: number;
  bandwidth: number;
};
```

### Requirements

1. Request Handling:
    - Request forwarding
    - Header modification
    - Response caching
    - SSL termination

2. Rule Processing:
    - URL matching
    - Request routing
    - Content modification
    - Header manipulation

3. Performance:
    - Connection pooling
    - Cache management
    - Buffer handling
    - Stream processing

### Edge Cases to Handle

- SSL certificates
- Connection drops
- Large payloads
- Cache invalidation
- Circular redirects
- Protocol errors
- Memory pressure
- Concurrent requests

### Example

```typescript
// Create proxy server
const proxy = new ProxyServer({
  port: 8080,
  ssl: {
    cert: 'path/to/cert.pem',
    key: 'path/to/key.pem'
  },
  cache: {
    maxSize: '1GB',
    ttl: 3600
  }
});

// Add proxy rules
proxy.addRule({
  match: '/api/*',
  target: 'http://backend-api:3000',
  modify: {
    headers: {
      'X-Proxy-Version': '1.0',
      'X-Real-IP': '${req.ip}'
    },
    transform: async (body) => {
      // Modify response body
      const data = JSON.parse(body.toString());
      data.proxied = true;
      return Buffer.from(JSON.stringify(data));
    }
  }
});

// Add caching rule
proxy.addRule({
  match: '/static/*',
  target: 'http://static-server:8000',
  cache: {
    ttl: 86400  // 24 hours
  }
});

// Start proxy
await proxy.start();
console.log('Proxy running on port 8080');

// Check metrics
console.log(proxy.getMetrics());
// {
//   requests: 1000,
//   cached: 250,
//   errors: 2,
//   bandwidth: 1572864
// }

// Stop proxy
await proxy.stop();
```

## Notes

This exercise tests your ability to:
- Handle HTTP proxying
- Manage SSL/TLS
- Process headers
- Implement caching
- Handle streaming

Consider:
- Performance impact
- Memory usage
- Security implications
- Cache strategies
- Error handling

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Load balancing
2. Rate limiting
3. Circuit breaking
4. Request logging
5. Authentication
6. WebSocket support
7. CORS handling
8. Content compression

## Real-World Applications

This functionality is commonly used in:
- API gateways
- Load balancers
- Reverse proxies
- CDN edge servers
- Development tools
- Security proxies
- Debug proxies
- Service mesh
