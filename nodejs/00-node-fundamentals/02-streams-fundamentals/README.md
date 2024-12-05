# Streams Fundamentals Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, async/await, error handling

## Problem Description

Create streams to handle data processing, implement common stream patterns, and manage backpressure. This is fundamental for efficiently processing large files, network data, and data transformations in Node.js.

### Function Signature
```typescript
interface TransformOptions {
  highWaterMark?: number;
  encoding?: BufferEncoding;
}

class DataTransformer extends Transform {
  constructor(options?: TransformOptions);
  
  // Transform chunk of data
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void;

  // Called at end of input
  _flush(callback: TransformCallback): void;
}

class LineCounter extends Transform {
  private count: number = 0;

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void;
}

class FileStreamer {
  // Create readable stream from file
  createReadStream(path: string): ReadStream;

  // Create writable stream to file
  createWriteStream(path: string): WriteStream;

  // Pipe with progress and error handling
  pipe(
    source: Readable,
    destination: Writable,
    onProgress?: (bytes: number) => void
  ): Promise<void>;
}
```

### Requirements

1. Stream Creation:
    - Create readable streams
    - Create writable streams
    - Implement transform streams
    - Handle different encodings

2. Stream Operations:
    - Pipe data between streams
    - Transform data
    - Track progress
    - Handle backpressure

3. Error Handling:
    - Stream errors
    - Pipeline failures
    - Cleanup resources
    - Recovery strategies

### Example

```typescript
// Create file streamer
const streamer = new FileStreamer();

// Read file line by line
const readStream = streamer.createReadStream('input.txt');
const writeStream = streamer.createWriteStream('output.txt');

// Count lines while copying
const lineCounter = new LineCounter();
lineCounter.on('data', (count) => {
  console.log(`Lines processed: ${count}`);
});

// Create CSV to JSON transformer
const csvToJson = new DataTransformer({
  highWaterMark: 64 * 1024 // 64KB chunks
});

csvToJson._transform = (chunk, encoding, callback) => {
  try {
    const lines = chunk.toString().split('\n');
    const jsonLines = lines.map(line => {
      const [name, age] = line.split(',');
      return JSON.stringify({ name, age });
    });
    callback(null, jsonLines.join('\n'));
  } catch (error) {
    callback(error);
  }
};

// Pipe it all together with progress
await streamer.pipe(
  readStream,
  writeStream,
  (bytes) => console.log(`Processed ${bytes} bytes`)
);
```

## Notes

This exercise tests your ability to:
- Work with Node.js streams
- Handle streaming data
- Transform data efficiently
- Manage stream errors
- Track stream progress

Consider:
- Memory usage
- Backpressure handling
- Resource cleanup
- Error recovery
- Stream composition

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Stream compression
2. Multiple transforms
3. Stream forking
4. Object streams
5. Progress events

## Real-World Applications

This functionality is commonly used in:
- File processing
- Data import/export
- Log processing
- Network protocols
- Data transformation
- Media processing
- ETL operations
- API responses

Would you like me to:
1. Move on to exercise 3?
2. Adjust anything about this README?
3. Add more examples or edge cases?
