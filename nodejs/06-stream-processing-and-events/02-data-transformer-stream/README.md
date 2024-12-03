# Data Transformer Stream Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Stream concepts
    - Backpressure handling
    - Basic error handling

## Problem Description

Implement a data transformer stream that can process chunks of data, handle backpressure, and manage streaming errors. This is commonly used for processing large datasets, file transformations, and data pipelines.

### Function Signature
```typescript
type TransformOptions = {
  highWaterMark?: number;     // Buffer limit
  objectMode?: boolean;       // Handle objects vs buffers
  transform?: TransformFn;    // Transform function
  flush?: FlushFn;           // Final flush function
};

type TransformFn<TIn = any, TOut = any> = (
  chunk: TIn,
  encoding: string,
  callback: (error?: Error, data?: TOut) => void
) => void;

type FlushFn<T = any> = (
  callback: (error?: Error, data?: T) => void
) => void;

class DataTransformer<TIn = any, TOut = any> {
  constructor(options?: TransformOptions);

  // Write data to stream
  write(chunk: TIn): Promise<void>;

  // End stream
  end(): Promise<void>;

  // Handle transformed data
  on(event: 'data', listener: (chunk: TOut) => void): this;
  on(event: 'end', listener: () => void): this;
  on(event: 'error', listener: (err: Error) => void): this;

  // Get stream status
  getStatus(): StreamStatus;
}

type StreamStatus = {
  written: number;
  transformed: number;
  buffered: number;
  flowing: boolean;
};
```

### Requirements

1. Stream Processing:
    - Transform data chunks
    - Handle backpressure
    - Support object mode
    - Maintain order

2. Error Handling:
    - Transform errors
    - Stream errors
    - Cleanup on error
    - Error recovery

3. Flow Control:
    - Buffer management
    - Pause/resume
    - End handling
    - Flush behavior

### Edge Cases to Handle

- Buffer overflow
- Invalid chunks
- Transform errors
- Memory pressure
- Stream ending
- Error propagation
- Type mismatches
- Partial chunks

### Example

```typescript
// Create transformer
const transformer = new DataTransformer<string, number>({
  objectMode: true,
  transform: (chunk, encoding, callback) => {
    // Convert string to number
    const num = parseInt(chunk, 10);
    if (isNaN(num)) {
      callback(new Error('Invalid number'));
    } else {
      callback(null, num);
    }
  },
  flush: (callback) => {
    // Final operation when stream ends
    callback();
  }
});

// Handle events
transformer.on('data', (num) => {
  console.log(`Transformed: ${num}`);
});

transformer.on('end', () => {
  console.log('Stream ended');
});

transformer.on('error', (err) => {
  console.error('Error:', err);
});

// Write data
await transformer.write('123');  // Outputs: Transformed: 123
await transformer.write('456');  // Outputs: Transformed: 456
await transformer.write('abc');  // Errors: Invalid number

// End stream
await transformer.end();

// Check status
console.log(transformer.getStatus());
// {
//   written: 3,
//   transformed: 2,
//   buffered: 0,
//   flowing: true
// }
```

## Notes

This exercise tests your ability to:
- Handle streaming data
- Manage backpressure
- Handle errors
- Transform data
- Control flow

Consider:
- Memory efficiency
- Error handling
- Buffer management
- Type safety
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Async transforms
2. Transform pipelines
3. Data validation
4. Statistics tracking
5. Progress events
6. Chunk batching
7. Stream filters
8. Debug modes

## Real-World Applications

This functionality is commonly used in:
- File processing
- Data pipelines
- Log processing
- Data conversion
- ETL processes
- Stream processing
- Data filtering
- Format conversion
