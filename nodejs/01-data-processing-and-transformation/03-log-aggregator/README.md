# Log Aggregator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites: TypeScript, data aggregation, time-based operations

## Problem Description

Implement a function that processes an array of log entries and produces a summary of log activity. This is a common task in log analysis and monitoring systems.

### Function Signature
```typescript
type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

type LogEntry = {
  level: LogLevel;
  timestamp: string;
  message: string;
  metadata?: Record<string, unknown>;
};

type AggregatedLogs = {
  totalCount: number;
  errorCount: number;
  warnCount: number;
  infoCount: number;
  debugCount: number;
  errorMessages: string[];
  lastTimestamp: string;
  firstTimestamp: string;
};

function aggregateLogs(
  logs: LogEntry[],
  options: ProcessorOptions
): AggregatedLogs
```

### Requirements

The function should process log entries and return a summary that includes:

1. Count of logs by level:
   - Total number of logs
   - Number of logs at each severity level (ERROR, WARN, INFO, DEBUG)

2. Error tracking:
   - Collection of all error messages in order of occurrence

3. Timestamp tracking:
   - First log timestamp
   - Last log timestamp

### Edge Cases to Handle

1. Empty log array
2. Unsorted timestamps
3. Missing metadata
4. Single log entry
5. Multiple errors with same message
6. Logs with same timestamp

### Example

```typescript
const logs = [
  { 
    level: 'ERROR',
    timestamp: '2024-01-01T00:00:00Z',
    message: 'Failed to connect',
    metadata: { service: 'database' }
  },
  { 
    level: 'INFO',
    timestamp: '2024-01-01T00:01:00Z',
    message: 'Server started'
  }
];

const result = aggregateLogs(logs);

// Result:
{
  totalCount: 2,
  errorCount: 1,
  warnCount: 0,
  infoCount: 1,
  debugCount: 0,
  errorMessages: ['Failed to connect'],
  firstTimestamp: '2024-01-01T00:00:00Z',
  lastTimestamp: '2024-01-01T00:01:00Z'
}
```

## Notes for Candidates

This exercise tests your ability to:
- Process and aggregate data
- Work with TypeScript types
- Handle timestamps
- Deal with optional fields
- Process arrays efficiently

Consider:
- How would your solution scale with large log arrays?
- How would you handle invalid timestamps?
- How would you extend this to support custom aggregations?
- What additional metadata might be useful to aggregate?

## Getting Started

1. Implement your solution in `src/logAggregator.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases you think of

## Extension Ideas

Once you have the basic implementation working, consider adding:
- Time-based aggregation (e.g., logs per hour)
- Pattern matching in error messages
- Metadata aggregation
- Custom aggregation rules
- Performance optimization for large log sets

## Real-World Applications

This exercise simulates real-world scenarios like:
- Log analysis systems
- Monitoring dashboards
- Error tracking systems
- System health reporting
