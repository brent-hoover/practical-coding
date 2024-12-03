# Stream Analytics Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Statistical analysis
    - Window functions
    - Stream processing

## Problem Description

Implement a stream analytics system that can process real-time data streams, perform statistical analysis within sliding windows, and generate analytical insights. This is used in monitoring systems, real-time analytics, and data visualization platforms.

### Function Signature
```typescript
type WindowConfig = {
  size: number;             // Window size in ms
  slide: number;           // Slide interval in ms
  metrics: MetricConfig[];
};

type MetricConfig = {
  name: string;
  type: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'percentile';
  field?: string;          // Field to analyze
  options?: {
    percentile?: number;   // For percentile calculations
    threshold?: number;    // For threshold alerts
  };
};

class StreamAnalytics {
  constructor(options?: {
    maxWindows?: number;
    precision?: number;
  });

  // Add analysis window
  addWindow(name: string, config: WindowConfig): void;

  // Process data point
  process<T>(data: T): Promise<void>;

  // Get current analytics
  getAnalytics(window: string): Analytics;

  // Subscribe to metric updates
  subscribe(
    window: string,
    handler: (analytics: Analytics) => void
  ): () => void;

  // Get performance metrics
  getMetrics(): AnalyticsMetrics;
}

type Analytics = {
  window: string;
  start: number;
  end: number;
  metrics: Record<string, number>;
  samples: number;
};

type AnalyticsMetrics = {
  processedPoints: number;
  activeWindows: number;
  computeTime: number;
  memoryUsage: number;
};
```

### Requirements

1. Window Management:
    - Sliding windows
    - Tumbling windows
    - Window cleanup
    - Memory management

2. Statistical Analysis:
    - Basic statistics
    - Percentile calculation
    - Threshold monitoring
    - Trend detection

3. Performance:
    - Efficient computation
    - Memory optimization
    - Real-time updates
    - Resource management

### Edge Cases to Handle

- Window boundaries
- Data skew
- Memory limits
- Numeric precision
- Missing data
- Invalid values
- Time ordering
- Resource exhaustion

### Example

```typescript
// Create analytics
const analytics = new StreamAnalytics({
  maxWindows: 100,
  precision: 2
});

// Configure window
analytics.addWindow('temperature', {
  size: 300000,    // 5 minutes
  slide: 60000,    // 1 minute
  metrics: [
    { name: 'avg_temp', type: 'avg', field: 'temperature' },
    { name: 'max_temp', type: 'max', field: 'temperature' },
    { name: 'min_temp', type: 'min', field: 'temperature' },
    { 
      name: 'p95_temp', 
      type: 'percentile', 
      field: 'temperature',
      options: { percentile: 95 }
    }
  ]
});

// Subscribe to updates
const unsubscribe = analytics.subscribe(
  'temperature',
  (results) => {
    console.log('Window results:', results);
  }
);

// Process data points
await analytics.process({
  timestamp: Date.now(),
  temperature: 22.5,
  humidity: 45
});

// Get current analytics
const results = analytics.getAnalytics('temperature');
console.log(results);
// {
//   window: 'temperature',
//   start: 1621234567890,
//   end: 1621234867890,
//   metrics: {
//     avg_temp: 22.5,
//     max_temp: 22.5,
//     min_temp: 22.5,
//     p95_temp: 22.5
//   },
//   samples: 1
// }

// Check performance
console.log(analytics.getMetrics());
// {
//   processedPoints: 1,
//   activeWindows: 1,
//   computeTime: 0.5,
//   memoryUsage: 1024
// }
```

## Notes

This exercise tests your ability to:
- Process streaming data
- Perform statistical analysis
- Manage memory efficiently
- Handle real-time updates
- Monitor performance

Consider:
- Computation efficiency
- Memory management
- Numeric accuracy
- Update frequency
- Resource usage

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom metrics
2. Anomaly detection
3. Trend analysis
4. Historical storage
5. Visualization data
6. Alert generation
7. Data sampling
8. Time series forecasting

## Real-World Applications

This functionality is commonly used in:
- System monitoring
- IoT analytics
- Financial analysis
- Performance tracking
- User behavior analysis
- Network monitoring
- Sensor data analysis
- Real-time dashboards
