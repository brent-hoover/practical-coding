# Request Validator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - JSON Schema
    - HTTP concepts
    - Error handling patterns

## Problem Description

Implement a request validator that can validate HTTP requests against schemas, handle content validation, and provide detailed error reporting. This is commonly used in API servers to ensure request integrity and provide consistent error responses.

### Function Signature
```typescript
type ValidationSchema = {
  params?: Record<string, SchemaRule>;
  query?: Record<string, SchemaRule>;
  body?: Record<string, SchemaRule>;
  headers?: Record<string, SchemaRule>;
};

type SchemaRule = {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
  enum?: unknown[];
  items?: SchemaRule;       // For arrays
  properties?: Record<string, SchemaRule>;  // For objects
};

class RequestValidator {
  constructor(options?: ValidatorOptions);

  // Add validation schema
  addSchema(method: string, path: string, schema: ValidationSchema): void;

  // Validate request
  validate(req: Request): Promise<ValidationResult>;

  // Get registered schemas
  getSchemas(): Record<string, ValidationSchema>;
}

type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
  sanitized: {
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: Record<string, unknown>;
  };
};

type ValidationError = {
  field: string;
  location: 'params' | 'query' | 'body' | 'headers';
  message: string;
  value?: unknown;
};
```

### Requirements

1. Schema Validation:
    - Parameter validation
    - Query string validation
    - Request body validation
    - Header validation

2. Error Handling:
    - Detailed error messages
    - Multiple error collection
    - Error formatting
    - Type coercion

3. Request Processing:
    - Content type handling
    - Request parsing
    - Schema matching
    - Data sanitization

### Edge Cases to Handle

- Invalid content types
- Malformed data
- Missing fields
- Type mismatches
- Pattern validation
- Nested objects
- Array validation
- Optional fields

### Example

```typescript
// Create validator
const validator = new RequestValidator();

// Add schema
validator.addSchema('POST', '/users', {
  body: {
    username: {
      type: 'string',
      required: true,
      pattern: '^[a-zA-Z0-9]{3,}$'
    },
    email: {
      type: 'string',
      required: true,
      pattern: '^[^@]+@[^@]+\\.[^@]+$'
    },
    age: {
      type: 'number',
      min: 18
    },
    preferences: {
      type: 'object',
      properties: {
        theme: {
          type: 'string',
          enum: ['light', 'dark']
        },
        notifications: {
          type: 'boolean'
        }
      }
    }
  }
});

// Validate request
const req = new Request('http://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'john123',
    email: 'invalid-email',
    age: 16,
    preferences: {
      theme: 'blue'
    }
  })
});

const result = await validator.validate(req);
console.log(result);
// {
//   valid: false,
//   errors: [
//     {
//       field: 'email',
//       location: 'body',
//       message: 'Invalid email format',
//       value: 'invalid-email'
//     },
//     {
//       field: 'age',
//       location: 'body',
//       message: 'Value must be at least 18',
//       value: 16
//     },
//     {
//       field: 'preferences.theme',
//       location: 'body',
//       message: 'Value must be one of: light, dark',
//       value: 'blue'
//     }
//   ],
//   sanitized: {
//     params: {},
//     query: {},
//     body: {
//       username: 'john123',
//       preferences: { theme: 'blue' }
//     }
//   }
// }
```

## Notes

This exercise tests your ability to:
- Implement validation logic
- Handle complex schemas
- Process HTTP requests
- Format error messages
- Sanitize input data

Consider:
- Validation efficiency
- Error clarity
- Type coercion rules
- Memory usage
- Schema flexibility

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom validators
2. Async validation
3. Schema composition
4. Conditional validation
5. Schema inheritance
6. Error translation
7. Schema generation
8. OpenAPI integration

## Real-World Applications

This functionality is commonly used in:
- API servers
- Form validation
- Data ingestion
- Request processing
- Input sanitization
- API gateways
- Data validation
- Security checks
