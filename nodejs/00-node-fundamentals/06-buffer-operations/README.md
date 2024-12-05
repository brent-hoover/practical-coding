# Buffer Operations Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Understanding of binary data

## Problem Description

Implement common buffer operations for handling binary data, converting between formats, and managing buffer manipulations. This is fundamental for working with binary data, network protocols, and file operations in Node.js.

### Function Signature
```typescript
type BufferOptions = {
  encoding?: BufferEncoding;
  size?: number;
};

class BufferHandler {
  constructor(options?: BufferOptions);

  // Create buffer
  create(
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
}
```

### Requirements

1. Buffer Creation:
    - From strings
    - From arrays
    - From other buffers
    - With encoding

2. Buffer Operations:
    - Concatenation
    - Comparison
    - Copying
    - Slicing

3. Data Conversion:
    - String encoding
    - Number conversion
    - Base64/hex
    - UTF-8 handling

### Example

```typescript
// Create buffer handler
const buffers = new BufferHandler({
  encoding: 'utf8'
});

// Create buffer from string
const buf1 = buffers.create('Hello World');
console.log(buf1);  // <Buffer 48 65 6c 6c 6f>

// Create buffer from array
const buf2 = buffers.create([1, 2, 3, 4, 5]);

// Convert to string
const str = buffers.toString(buf1);
console.log(str);  // Hello World

// Convert to base64
const base64 = buffers.toString(buf1, 'base64');
console.log(base64);  // SGVsbG8gV29ybGQ=

// Concatenate buffers
const combined = buffers.concat([buf1, buf2]);

// Compare buffers
const comparison = buffers.compare(buf1, buf2);
console.log(comparison);  // -1 if buf1 < buf2
```

## Notes

This exercise tests your ability to:
- Handle binary data
- Convert between formats
- Work with encodings
- Manage buffer operations
- Handle errors

Consider:
- Memory usage
- Encoding issues
- Error handling
- Performance impact
- Buffer pooling

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Buffer pooling
2. Custom encodings
3. Buffer streams
4. Buffer validation
5. Memory optimization

## Real-World Applications

This functionality is commonly used in:
- Network protocols
- File operations
- Cryptography
- Image processing
- Binary formats
- Data compression
- IPC communication
- WebSocket data
