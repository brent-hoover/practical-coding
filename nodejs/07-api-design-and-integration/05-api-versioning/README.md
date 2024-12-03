# API Versioning Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - API design patterns
    - Route handling
    - Content negotiation

## Problem Description

Implement an API versioning system that can handle multiple API versions, manage version compatibility, and route requests to appropriate handlers. This is commonly used in evolving APIs to maintain backward compatibility while adding new features.

### Function Signature
```typescript
type VersionConfig = {
  supportedVersions: string[];
  defaultVersion?: string;
  deprecatedVersions?: string[];
};

type VersionedRoute = {
  path: string;
  method: string;
  version: string;
  handler: RouteHandler;
};

type VersioningStrategy = 'url' | 'header' | 'query' | 'content-type';

class ApiVersioning {
  constructor(
    config: VersionConfig,
    options?: {
      strategy?: VersioningStrategy;
      headerName?: string;
      queryParam?: string;
    }
  );

  // Add versioned route
  addRoute(route: VersionedRoute): void;

  // Handle request with versioning
  handleRequest(req: Request): Promise<Response>;

  // Get version information
  getVersionInfo(version: string): VersionInfo;

  // Check compatibility
  isCompatible(requestedVersion: string, currentVersion: string): boolean;
}

type VersionInfo = {
  supported: boolean;
  deprecated: boolean;
  sunset?: string;
  alternatives?: string[];
};
```

### Requirements

1. Version Management:
    - Version detection
    - Version routing
    - Compatibility checking
    - Version fallbacks

2. Request Handling:
    - Multiple versioning strategies
    - Version extraction
    - Route matching
    - Handler selection

3. Response Management:
    - Version headers
    - Deprecation notices
    - Alternative suggestions
    - Error handling

### Edge Cases to Handle

- Invalid versions
- Missing versions
- Deprecated versions
- Version conflicts
- Unknown routes
- Mixed strategies
- Compatibility breaks
- Version transitions

### Example

```typescript
// Create versioning system
const versioning = new ApiVersioning(
  {
    supportedVersions: ['1.0', '1.1', '2.0'],
    defaultVersion: '2.0',
    deprecatedVersions: ['1.0']
  },
  {
    strategy: 'header',
    headerName: 'API-Version'
  }
);

// Add versioned routes
versioning.addRoute({
  path: '/users',
  method: 'GET',
  version: '1.0',
  handler: async (req) => {
    // Old implementation
    return new Response(JSON.stringify({ users: [] }));
  }
});

versioning.addRoute({
  path: '/users',
  method: 'GET',
  version: '2.0',
  handler: async (req) => {
    // New implementation with pagination
    return new Response(JSON.stringify({
      users: [],
      pagination: { page: 1, total: 0 }
    }));
  }
});

// Handle request
const req = new Request('http://api.example.com/users', {
  headers: {
    'API-Version': '1.0'
  }
});

const response = await versioning.handleRequest(req);
// Response includes deprecation warning header

// Check version info
console.log(versioning.getVersionInfo('1.0'));
// {
//   supported: true,
//   deprecated: true,
//   sunset: '2024-12-31',
//   alternatives: ['2.0']
// }
```

## Notes

This exercise tests your ability to:
- Handle API versions
- Route requests
- Manage compatibility
- Handle transitions
- Document changes

Consider:
- Version detection
- Compatibility rules
- Header management
- Error handling
- Documentation

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Version negotiation
2. Feature flags
3. Version mapping
4. Schema versioning
5. Migration guides
6. Sunset dates
7. Version metrics
8. Auto-documentation

## Real-World Applications

This functionality is commonly used in:
- Public APIs
- REST services
- SDK development
- Microservices
- Platform APIs
- Mobile backends
- Integration APIs
- Partner APIs
