# Object Transformer Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript knowledge (generics, recursive types)
    - Deep understanding of object manipulation
    - Experience with recursion and tree traversal
    - Solid grasp of type safety concepts

## Problem Description

Implement functions to transform between nested and flat object structures using dot notation. While this may sound straightforward, implementing this with full type safety, handling all edge cases, and ensuring reliable bidirectional transformation makes this a complex challenge.

### Function Signature
```typescript
// Convert nested object to flat structure
function flatten<T extends Record<string, any>>(
  obj: T,
  options?: {
    delimiter?: string;     // Custom delimiter (default '.')
    maxDepth?: number;      // Maximum nesting depth
    preserveArrays?: boolean; // Keep arrays intact
    safe?: boolean;         // Enable circular reference detection
  }
): Record<string, unknown>;

// Convert flat object back to nested structure
function unflatten<T extends Record<string, any>>(
  flatObj: Record<string, unknown>,
  options?: {
    delimiter?: string;     // Custom delimiter (default '.')
    preserveArrays?: boolean; // Detect and restore arrays
    safe?: boolean;         // Enable additional safety checks
  }
): T;
```

### Requirements

1. Core Transformation:
    - Convert between nested and flat structures while preserving all data
    - Maintain bidirectional transformation capability (flatten → unflatten should restore original)
    - Handle all JavaScript primitive types correctly
    - Support custom delimiters for path creation

2. Advanced Features:
    - Detect and handle circular references
    - Support arrays both as path segments and preserved structures
    - Handle numeric keys and array indices properly
    - Respect maximum depth limits
    - Preserve type information where possible

3. Type Safety:
    - Implement proper TypeScript generics
    - Maintain type information through transformations
    - Provide type-safe options interface
    - Handle unknown types gracefully

4. Error Handling:
    - Detect and report circular references
    - Handle invalid input gracefully
    - Provide meaningful error messages
    - Support safe mode with error collection

### Edge Cases to Handle

- Circular References:
  ```typescript
  const obj: any = { a: 1 };
  obj.self = obj;  // Circular reference
  ```

- Array Handling:
  ```typescript
  const obj = {
    users: [
      { name: 'John', tags: ['admin', 'user'] },
      { name: 'Jane', tags: ['user'] }
    ]
  };
  ```

- Special Characters in Keys:
  ```typescript
  const obj = {
    'user.name': 'John',  // Key contains delimiter
    'array.0': 'value'    // Key looks like array path
  };
  ```

- Type Preservation:
  ```typescript
  const obj = {
    date: new Date(),     // Should preserve object type
    regex: /test/,        // Should preserve RegExp
    num: 42n              // Should preserve BigInt
  };
  ```

### Example

```typescript
const nested = {
  user: {
    name: {
      first: 'John',
      last: 'Doe'
    },
    addresses: [
      { city: 'New York', country: 'USA' },
      { city: 'London', country: 'UK' }
    ]
  }
};

const flat = flatten(nested);
// Result:
{
  'user.name.first': 'John',
  'user.name.last': 'Doe',
  'user.addresses.0.city': 'New York',
  'user.addresses.0.country': 'USA',
  'user.addresses.1.city': 'London',
  'user.addresses.1.country': 'UK'
}

const restored = unflatten(flat);
// Should perfectly restore the original structure
```

## Notes

This exercise tests your ability to:
- Implement complex recursive algorithms
- Handle non-trivial edge cases
- Maintain type safety in complex scenarios
- Deal with potentially dangerous operations (circular refs)
- Balance performance with safety
- Think through all possible input scenarios

Consider:
- Memory usage with deeply nested objects
- Performance implications of safety checks
- Type system limitations and workarounds
- Error handling strategies
- Edge case interactions

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Start with basic cases first:
    - Simple nested objects
    - Basic array handling
    - Primary primitive types
4. Gradually add handling for edge cases
5. Add type safety
6. Implement advanced features
7. Add comprehensive error handling

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Streaming support for large objects
2. Custom serialization handlers
3. Path transformation functions
4. Advanced array handling options
5. Schema validation
6. Performance optimizations
7. Circular reference serialization
8. Support for Maps and Sets

## Real-World Applications

This functionality is commonly used in:
- Form libraries (converting between flat form data and nested objects)
- API data transformation layers
- Configuration management systems
- Database ORM mappings
- State management systems
- Query parameter handling
- Document databases
- JSON processing pipelines
