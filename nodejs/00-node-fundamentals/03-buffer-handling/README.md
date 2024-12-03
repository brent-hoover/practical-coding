# Buffer Handling Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Understanding of binary data
    - Basic memory concepts

## Problem Description

Implement a buffer handling system that can manage binary data, perform conversions, and handle buffer operations efficiently. This is fundamental for working with files, network protocols, and binary data in Node.js.

### Function Signature
```typescript
type BufferEncoding = 'utf8' | 'base64' | 'hex' | 'ascii';

type BufferOptions = {
  size?: number;
  encoding?: BufferEncoding;
  copy?: boolean;
};

class BufferHandler {
  constructor(options?: BufferOptions);

  // Create buffer from data
  from(
    data: string | number[] | Buffer,
    encoding?: BufferEncoding
  ): Buffer;

  // Convert buffer to string
  toString(
    buffer: Buffer,
    encoding?: BufferEncoding
  ): string;

  // Concatenate buffers
  concat(buffers: Buffer[]): Buffer;

  // Compare buffers
  compare(a: Buffer, b: Buffer): number;

  // Slice buffer
  slice(
    buffer: Buffer,
    start?: number,
    end?: number
  ): Buffer;

  // Get buffer info
  getInfo(buffer: Buffer): BufferInfo;
}

type BufferInfo = {
  size: number;
  capacity: number;
  encoding: BufferEncoding;
  isEmpty: boolean;
};
```

### Requirements

1. Buffer Creation:
    - From strings
    - From arrays
    - From other buffers
    - With encoding

2. Buffer Operations:
    - Concatenation
    - Slicing
    - Comparison
    - Copying

3. Data Conversion:
    - String conversion
    - Encoding handling
    - Type conversion
    - Validation

### Edge Cases to Handle

- Invalid encodings
- Buffer overflow
- Memory limits
- Invalid inputs
- Zero-length buffers
- Invalid slices
- Encoding errors
- Buffer pooling

### Example

```typescript
// Create handler
const handler = new BufferHandler({
  size: 1024,
  encoding: 'utf8'
});

// Create buffer from string
const buffer = handler.from('Hello, World!');

// Convert to different encoding
const base64 = handler.toString(buffer, 'base64');
console.log(base64);  // SGVsbG8sIFdvcmxkIQ==

// Create buffer from array
const numbers = handler.from([1, 2, 3, 4, 5]);

// Concatenate buffers
const combined = handler.concat([
  handler.from('Hello'),
  handler.from(' '),
  handler.from('World')
]);

// Compare buffers
const comparison = handler.compare(
  handler.from('a'),
  handler.from('b')
);
console.log(comparison);  // -1 (a < b)

// Slice buffer
const slice = handler.slice(buffer, 0, 5);
console.log(handler.toString(slice));  // Hello

// Get buffer info
console.log(handler.getInfo(buffer));
// {
//   size: 13,
//   capacity: 13,
//   encoding: 'utf8',
//   isEmpty: false
// }
```

## Notes

This exercise tests your ability to:
- Handle binary data
- Manage memory
- Convert data types
- Work with encodings
- Handle errors

Consider:
- Memory efficiency
- Buffer pooling
- Error handling
- Performance impact
- Memory leaks

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Buffer pooling
2. Custom encodings
3. Streaming support
4. Buffer transformations
5. Memory tracking
6. Buffer validation
7. Safe operations
8. Performance optimizations

## Real-World Applications

This functionality is commonly used in:
- File operations
- Network protocols
- Image processing
- Data encryption
- Binary formats
- Data compression
- Streaming data
- IPC communication
