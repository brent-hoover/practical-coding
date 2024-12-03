# Real-time Pipeline Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Stream processing
    - Pipeline patterns
    - Performance optimization

## Problem Description

Implement a real-time data pipeline that can process streaming data through multiple stages, manage state, and monitor performance. This is used in real-time analytics, data processing, and event stream handling.

### Function Signature
```typescript
type StageConfig<TIn, TOut> = {
  name: string;
  transform: (data: TIn) => Promise<TOut>;
  filter?: (data: TIn) => boolean;
  bufferSize?: number;
  timeout?: number;
};

type PipelineOptions = {
  maxConcurrency?: number;
  monitoring?: boolean;
  errorThreshold?: number;
};

class RealTimePipeline {
  constructor(options?: PipelineOptions);

  // Add processing stage
  addStage<TIn, TOut>(config: StageConfig<TIn, TOut>): this;

  // Push data into pipeline
  push<T>(data: T): Promise<void>;

  // Subscribe to pipeline output
  subscribe<T>(handler: (data: T) => void): () => void;

  // Start pipeline processing
  start(): Promise<void>;

  // Stop pipeline processing
  stop(): Promise<void>;

  // Get pipeline metrics
  getMetrics(): PipelineMetrics;
}

type PipelineMetrics = {
  stages: Record<string, {
    processed: number;
    errors: number;
    backpressure: number;
    latency: number;
  }>;
  throughput: number;
  activeWorkers: number;
};
```

### Requirements

1. Pipeline Management:
    - Stage configuration
    - Data flow control
    - Concurrency management
    - Backpressure handling

2. Data Processing:
    - Transform operations
    - Filtering
    - Buffering
    - Error handling

3. Performance Monitoring:
    - Stage metrics
    - Throughput tracking
    - Latency measurement
    - Resource usage

### Edge Cases to Handle

- Pipeline backpressure
- Stage failures
- Memory pressure
- Processing timeouts
- Data type mismatches
- Worker exhaustion
- Error propagation
- State consistency

### Example

```typescript
// Create pipeline
const pipeline = new RealTimePipeline({
  maxConcurrency: 4,
  monitoring: true,
  errorThreshold: 0.1  // 10% error rate threshold
});

// Configure stages
pipeline
  .addStage({
    name: 'parse',
    transform: async (data: string) => JSON.parse(data),
    bufferSize: 1000
  })
  .addStage({
    name: 'validate',
    transform: async (data: any) => validateSchema(data),
    filter: data => data.version === '1.0'
  })
  .addStage({
    name: 'enrich',
    transform: async (data) => {
      const extra = await fetchExtraData(data.id);
      return { ...data, ...extra };
    },
    timeout: 5000
  });

// Subscribe to output
const unsubscribe = pipeline.subscribe(
  (result) => {
    console.log('Processed:', result);
  }
);

// Start pipeline
await pipeline.start();

// Push data
await pipeline.push('{"id": 123, "version": "1.0"}');

// Check metrics
console.log(pipeline.getMetrics());
// {
//   stages: {
//     parse: {
//       processed: 1,
//       errors: 0,
//       backpressure: 0,
//       latency: 0.5
//     },
//     validate: {
//       processed: 1,
//       errors: 0,
//       backpressure: 0,
//       latency: 0.3
//     },
//     enrich: {
//       processed: 1,
//       errors: 0,
//       backpressure: 0,
//       latency: 150.2
//     }
//   },
//   throughput: 100,
//   activeWorkers: 1
// }

// Stop pipeline
await pipeline.stop();
```

## Notes

This exercise tests your ability to:
- Design pipeline architectures
- Handle streaming data
- Manage concurrency
- Monitor performance
- Handle errors

Consider:
- Memory efficiency
- Processing order
- Error recovery
- Monitoring overhead
- Scaling behavior

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Dynamic stages
2. Stage branching
3. Stage bypass
4. Batch processing
5. State persistence
6. Hot reloading
7. Circuit breakers
8. Priority handling

## Real-World Applications

This functionality is commonly used in:
- Real-time analytics
- Log processing
- Data enrichment
- Stream processing
- Event processing
- Data transformation
- Monitoring systems
- ETL pipelines
