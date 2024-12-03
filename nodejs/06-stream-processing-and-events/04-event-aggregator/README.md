# Event Aggregator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Window functions
    - Event handling
    - Time-based operations

## Problem Description

Implement an event aggregator that can combine related events within time windows, perform pattern matching, and generate aggregate events. This is commonly used in monitoring systems, analytics, and complex event processing.

### Function Signature
```typescript
type WindowOptions = {
  size: number;              // Window size in ms
  slide?: number;           // Slide interval in ms
  maxEvents?: number;       // Max events per window
};

type AggregateRule<TIn, TOut> = {
  pattern: string | RegExp;  // Event type pattern
  window: WindowOptions;
  aggregate: (events: TIn[]) => TOut;
};

class EventAggregator {
  constructor(options?: {
    maxRules?: number;
    maxWindows?: number;
  });

  // Add aggregation rule
  addRule<TIn, TOut>(
    rule: AggregateRule<TIn, TOut>
  ): void;

  // Process input event
  process<T>(
    type: string,
    event: T
  ): Promise<void>;

  // Subscribe to aggregated events
  subscribe<T>(
    pattern: string | RegExp,
    handler: (event: T) => void
  ): () => void;

  // Get aggregator metrics
  getMetrics(): AggregatorMetrics;
}

type AggregatorMetrics = {
  rules: number;
  windows: number;
  processedEvents: number;
  aggregatedEvents: number;
  activeSubscriptions: number;
};
```

### Requirements

1. Window Management:
    - Time windows
    - Sliding windows
    - Event counting
    - Window cleanup

2. Pattern Matching:
    - Event type matching
    - Regular expressions
    - Multiple patterns
    - Pattern priority

3. Aggregation:
    - Event combination
    - Custom aggregation
    - Event correlation
    - Time ordering

### Edge Cases to Handle

- Window boundaries
- Late events
- Pattern conflicts
- Memory limits
- Time skew
- Invalid patterns
- Aggregation errors
- Empty windows

### Example

```typescript
// Create aggregator
const aggregator = new EventAggregator({
  maxRules: 100,
  maxWindows: 1000
});

// Define event types
interface TemperatureEvent {
  sensorId: string;
  temperature: number;
  timestamp: number;
}

interface AggregatedTemp {
  sensorId: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  period: number;
}

// Add aggregation rule
aggregator.addRule<TemperatureEvent, AggregatedTemp>({
  pattern: 'sensor.temperature.*',
  window: {
    size: 60000,    // 1 minute
    slide: 10000,   // 10 seconds
    maxEvents: 100
  },
  aggregate: (events) => ({
    sensorId: events[0].sensorId,
    avgTemp: average(events.map(e => e.temperature)),
    minTemp: Math.min(...events.map(e => e.temperature)),
    maxTemp: Math.max(...events.map(e => e.temperature)),
    period: events.length
  })
});

// Subscribe to aggregated events
const unsubscribe = aggregator.subscribe<AggregatedTemp>(
  'sensor.temperature.*',
  (event) => {
    console.log(`Sensor ${event.sensorId} avg temp: ${event.avgTemp}`);
  }
);

// Process events
await aggregator.process('sensor.temperature.1', {
  sensorId: 'sensor1',
  temperature: 22.5,
  timestamp: Date.now()
});

// Check metrics
console.log(aggregator.getMetrics());
// {
//   rules: 1,
//   windows: 1,
//   processedEvents: 1,
//   aggregatedEvents: 0,
//   activeSubscriptions: 1
// }

// Cleanup
unsubscribe();
```

## Notes

This exercise tests your ability to:
- Handle time windows
- Match patterns
- Aggregate events
- Manage subscriptions
- Track metrics

Consider:
- Memory efficiency
- Time accuracy
- Pattern matching
- Window management
- Event ordering

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom window types
2. Event correlation
3. Pattern hierarchies
4. Window persistence
5. Late event handling
6. Metric tracking
7. Debug logging
8. Rule validation

## Real-World Applications

This functionality is commonly used in:
- Monitoring systems
- Analytics platforms
- IoT data processing
- System metrics
- Log aggregation
- Network monitoring
- Sensor data
- Performance tracking
