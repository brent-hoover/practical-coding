import { describe, it, expect } from 'vitest';
import { aggregateLogs, type LogEntry } from './index.js';

describe('aggregateLogs', () => {
  // Start with the simplest possible case
  it('should handle empty log array', () => {
    const result = aggregateLogs([]);
    expect(result).toEqual({
      totalCount: 0,
      errorCount: 0,
      warnCount: 0,
      infoCount: 0,
      debugCount: 0,
      errorMessages: [],
      firstTimestamp: '',
      lastTimestamp: '',
    });
  });

  // Single entry - next simplest case
  it('should handle single log entry', () => {
    const logs: LogEntry[] = [
      { level: 'INFO', timestamp: '2024-01-01T00:00:00Z', message: 'Server started' },
    ];

    const result = aggregateLogs(logs);
    expect(result).toEqual({
      totalCount: 1,
      errorCount: 0,
      warnCount: 0,
      infoCount: 1,
      debugCount: 0,
      errorMessages: [],
      firstTimestamp: '2024-01-01T00:00:00Z',
      lastTimestamp: '2024-01-01T00:00:00Z',
    });
  });

  // Simple case with two different log levels
  it('should handle basic logs with different levels', () => {
    const logs: LogEntry[] = [
      { level: 'ERROR', timestamp: '2024-01-01T00:00:00Z', message: 'Failed to connect' },
      { level: 'INFO', timestamp: '2024-01-01T00:01:00Z', message: 'Server started' },
    ];

    const result = aggregateLogs(logs);
    expect(result).toEqual({
      totalCount: 2,
      errorCount: 1,
      warnCount: 0,
      infoCount: 1,
      debugCount: 0,
      errorMessages: ['Failed to connect'],
      firstTimestamp: '2024-01-01T00:00:00Z',
      lastTimestamp: '2024-01-01T00:01:00Z',
    });
  });

  // Now add complexity with all log levels
  it('should count all log levels correctly', () => {
    const logs: LogEntry[] = [
      { level: 'ERROR', timestamp: '2024-01-01T00:00:00Z', message: 'Error message' },
      { level: 'WARN', timestamp: '2024-01-01T00:01:00Z', message: 'Warning message' },
      { level: 'INFO', timestamp: '2024-01-01T00:02:00Z', message: 'Info message' },
      { level: 'DEBUG', timestamp: '2024-01-01T00:03:00Z', message: 'Debug message' },
    ];

    const result = aggregateLogs(logs);
    expect(result.errorCount).toBe(1);
    expect(result.warnCount).toBe(1);
    expect(result.infoCount).toBe(1);
    expect(result.debugCount).toBe(1);
    expect(result.totalCount).toBe(4);
  });

  // Test optional metadata handling
  it('should handle logs with metadata', () => {
    const logs: LogEntry[] = [
      {
        level: 'ERROR',
        timestamp: '2024-01-01T00:00:00Z',
        message: 'Failed to connect',
        metadata: { service: 'database', retries: 3 },
      },
      {
        level: 'INFO',
        timestamp: '2024-01-01T00:01:00Z',
        message: 'Server started',
        metadata: { port: 3000 },
      },
    ];

    const result = aggregateLogs(logs);
    expect(result.totalCount).toBe(2);
    expect(result.errorMessages).toEqual(['Failed to connect']);
  });

  // Test timestamp ordering
  it('should handle unsorted timestamps', () => {
    const logs: LogEntry[] = [
      { level: 'ERROR', timestamp: '2024-01-01T00:02:00Z', message: 'Error 2' },
      { level: 'ERROR', timestamp: '2024-01-01T00:01:00Z', message: 'Error 1' },
      { level: 'ERROR', timestamp: '2024-01-01T00:03:00Z', message: 'Error 3' },
    ];

    const result = aggregateLogs(logs);
    expect(result.firstTimestamp).toBe('2024-01-01T00:01:00Z');
    expect(result.lastTimestamp).toBe('2024-01-01T00:03:00Z');
  });

  // Most complex case - multiple errors, maintaining order
  it('should collect all error messages in order', () => {
    const logs: LogEntry[] = [
      { level: 'ERROR', timestamp: '2024-01-01T00:00:00Z', message: 'Error 1' },
      { level: 'INFO', timestamp: '2024-01-01T00:01:00Z', message: 'Info message' },
      { level: 'ERROR', timestamp: '2024-01-01T00:02:00Z', message: 'Error 2' },
      { level: 'WARN', timestamp: '2024-01-01T00:03:00Z', message: 'Warning message' },
      { level: 'ERROR', timestamp: '2024-01-01T00:04:00Z', message: 'Error 3' },
    ];

    const result = aggregateLogs(logs);
    expect(result.errorMessages).toEqual(['Error 1', 'Error 2', 'Error 3']);
    expect(result.errorCount).toBe(3);
  });
});
