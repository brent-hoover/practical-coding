# Config Validator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript type system
    - Schema validation concepts
    - Type coercion
    - Error handling patterns

## Problem Description

Implement a configuration validator that can validate configuration objects against a schema, handle type coercion, and provide detailed error reporting. This is essential for ensuring configuration correctness and type safety in applications.

### Function Signature
```typescript
type SchemaType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'array' 
  | 'object';

type ValidationRule = {
  type: SchemaType;
  required?: boolean;
  default?: unknown;
  enum?: unknown[];
  validate?: (value: unknown) => boolean;
  coerce?: boolean;
  nested?: ConfigSchema;  // For objects
  items?: ValidationRule; // For arrays
};

type ConfigSchema = Record<string, ValidationRule>;

type ValidationError = {
  path: string[];
  value: unknown;
  rule: string;
  message: string;
};

type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
  coerced: Record<string, unknown>;
};

class ConfigValidator {
  constructor(schema: ConfigSchema);

  // Validate configuration object
  validate(config: Record<string, unknown>): ValidationResult;

  // Add custom type
  addType(name: string, validator: (value: unknown) => boolean): void;

  // Add custom coercion rule
  addCoercion(
    from: SchemaType, 
    to: SchemaType, 
    coercer: (value: unknown) => unknown
  ): void;
}
```

### Requirements

1. Schema Validation:
    - Validate basic types
    - Support nested objects
    - Handle arrays
    - Custom validation rules

2. Type Coercion:
    - Automatic type conversion
    - Custom coercion rules
    - Safe type casting
    - Preserve original values

3. Error Reporting:
    - Detailed error messages
    - Error path tracking
    - Multiple error collection
    - Custom error formatting

### Edge Cases to Handle

- Deep nested objects
- Array validation
- Circular references
- Invalid coercion
- Missing required fields
- Invalid enum values
- Type mismatches
- Custom type validation

### Example

```typescript
const validator = new ConfigValidator({
  port: {
    type: 'number',
    required: true,
    validate: (v) => v >= 0 && v <= 65535
  },
  database: {
    type: 'object',
    required: true,
    nested: {
      host: { type: 'string', required: true },
      port: { type: 'number', default: 5432 },
      credentials: {
        type: 'object',
        nested: {
          username: { type: 'string', required: true },
          password: { type: 'string', required: true }
        }
      }
    }
  },
  features: {
    type: 'array',
    items: {
      type: 'string',
      enum: ['auth', 'api', 'websocket']
    }
  }
});

const result = validator.validate({
  port: "3000",  // Will be coerced to number
  database: {
    host: "localhost",
    credentials: {
      username: "admin",
      password: "secret"
    }
  },
  features: ["auth", "invalid"]
});

console.log(result);
// {
//   valid: false,
//   errors: [
//     {
//       path: ['features', '1'],
//       value: 'invalid',
//       rule: 'enum',
//       message: 'Value must be one of: auth, api, websocket'
//     }
//   ],
//   coerced: {
//     port: 3000,
//     database: {
//       host: "localhost",
//       port: 5432,
//       credentials: {
//         username: "admin",
//         password: "secret"
//       }
//     },
//     features: ["auth", "invalid"]
//   }
// }
```

## Notes

This exercise tests your ability to:
- Implement schema validation
- Handle type coercion
- Process nested structures
- Provide detailed error reporting
- Support custom validation

Consider:
- Performance with large configs
- Memory usage
- Error message clarity
- Type safety
- Validation extensibility

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom type definitions
2. Regular expression validation
3. Conditional validation
4. Cross-field validation
5. Async validation
6. Schema composition
7. Value transformation
8. Schema documentation

## Real-World Applications

This functionality is commonly used in:
- Application configuration
- API request validation
- Form validation
- Data import/export
- Configuration management
- Environment validation
- Service configuration
- Integration testing
