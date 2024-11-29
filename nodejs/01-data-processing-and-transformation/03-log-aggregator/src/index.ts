export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export type LogEntry = {
  level: LogLevel;
  timestamp: string;
  message: string;
  metadata?: Record<string, unknown>;
};

type LogCountKey = 'errorCount' | 'warnCount' | 'infoCount' | 'debugCount';

const logMap: Record<LogLevel, LogCountKey> = {
  ERROR: 'errorCount',
  WARN: 'warnCount',
  INFO: 'infoCount',
  DEBUG: 'debugCount',
};

export type AggregatedLogs = {
  totalCount: number;
  errorCount: number;
  warnCount: number;
  infoCount: number;
  debugCount: number;
  errorMessages: string[];
  lastTimestamp: string;
  firstTimestamp: string;
};

export function aggregateLogs(logs: LogEntry[]): AggregatedLogs {
  const aggregatedLogs: AggregatedLogs = {
    totalCount: logs.length,
    errorCount: 0,
    warnCount: 0,
    infoCount: 0,
    debugCount: 0,
    errorMessages: [],
    firstTimestamp: '',
    lastTimestamp: '',
  };
  // first set timestamps
  for (const log of logs) {
    if (log.timestamp < aggregatedLogs.firstTimestamp || aggregatedLogs.firstTimestamp === '') {
      aggregatedLogs.firstTimestamp = log.timestamp;
    }

    if (log.timestamp > aggregatedLogs.lastTimestamp || aggregatedLogs.lastTimestamp === '') {
      aggregatedLogs.lastTimestamp = log.timestamp;
    }

    // increment the count for the log level
    const countKey = logMap[log.level];
    aggregatedLogs[countKey]++;

    // if error, add the message to the errorMessages array
    if (log.level === 'ERROR') {
      aggregatedLogs.errorMessages.push(log.message);
    }
  }
  return aggregatedLogs;
}
