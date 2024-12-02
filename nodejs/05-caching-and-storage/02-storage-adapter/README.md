# Storage Adapter Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - TypeScript
    - File system operations
    - Error handling
    - Basic async patterns

## Problem Description

Implement a storage adapter that provides a consistent interface for storing and retrieving data across different storage backends. This is commonly used to abstract storage implementations and make storage mechanisms interchangeable.

### Function Signature
```typescript
type StorageOptions = {
  basePath?: string;
  encoding?: 'utf8' | 'base64';
  createIfMissing?: boolean;
};

interface StorageAdapter {
  // Write data to storage
  write(key: string, data: string | Buffer): Promise<void>;

  // Read data from storage
  read(key: string): Promise<string | Buffer>;

  // Check if key exists
  exists(key: string): Promise<boolean>;

  // Delete data
  delete(key: string): Promise<void>;

  // List all keys
  list(prefix?: string): Promise<string[]>;

  // Get storage stats
  getStats(): Promise<StorageStats>;
}

class FileStorageAdapter implements StorageAdapter {
  constructor(options?: StorageOptions);
  // ... implements StorageAdapter interface
}

type StorageStats = {
  keys: number;
  size: number;
  available: number;
  lastOperation: string;
};
```

### Requirements

1. Basic Storage Operations:
    - Write data to storage
    - Read data from storage
    - Delete stored data
    - List stored keys

2. Error Handling:
    - Missing files/keys
    - Permission issues
    - Storage full
    - Invalid data

3. Path Management:
    - Key normalization
    - Path resolution
    - Prefix handling
    - Directory creation

### Edge Cases to Handle

- Invalid paths
- Storage limits
- Concurrent access
- Missing directories
- Invalid encodings
- Large files
- Permission errors
- Path traversal

### Example

```typescript
const storage = new FileStorageAdapter({
  basePath: './data',
  encoding: 'utf8',
  createIfMissing: true
});

// Write data
await storage.write('config.json', JSON.stringify({
  version: '1.0',
  settings: { debug: true }
}));

// Read data
const data = await storage.read('config.json');
console.log(JSON.parse(data.toString()));

// Check existence
const exists = await storage.exists('config.json');
console.log(exists);  // true

// List keys
const keys = await storage.list('config');
console.log(keys);  // ['config.json']

// Get stats
console.log(await storage.getStats());
// {
//   keys: 1,
//   size: 42,
//   available: 1000000,
//   lastOperation: 'read'
// }
```

## Notes

This exercise tests your ability to:
- Work with file systems
- Handle async operations
- Manage error cases
- Abstract implementations
- Ensure data integrity

Consider:
- Path security
- Error handling
- Performance impact
- Resource cleanup
- Cross-platform support

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Memory adapter
2. S3-like adapter
3. Encryption support
4. Compression
5. Streaming operations
6. Batch operations
7. Change notifications
8. Metadata support

## Real-World Applications

This functionality is commonly used in:
- File storage systems
- Configuration storage
- Log management
- Data backups
- Cache persistence
- User file storage
- Content management
- Asset storage
