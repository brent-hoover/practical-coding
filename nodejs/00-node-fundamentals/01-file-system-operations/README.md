# File System Operations Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Node.js runtime
    - Understanding of files and directories

## Problem Description

Implement a file system operations wrapper that provides a consistent interface for common file operations, handles paths correctly, and manages errors appropriately. This is a fundamental skill for working with files and directories in Node.js applications.

### Function Signature
```typescript
type FileOptions = {
  encoding?: BufferEncoding;
  flag?: string;
  mode?: number;
};

type WatchCallback = (event: 'change' | 'rename', filename: string) => void;

class FileSystem {
  constructor(options?: {
    basePath?: string;
    defaultEncoding?: BufferEncoding;
  });

  // Read file contents
  readFile(path: string, options?: FileOptions): Promise<string | Buffer>;

  // Write file contents
  writeFile(
    path: string, 
    data: string | Buffer,
    options?: FileOptions
  ): Promise<void>;

  // Read directory contents
  readDirectory(path: string): Promise<string[]>;

  // Watch file or directory
  watch(path: string, callback: WatchCallback): void;

  // Get file information
  getStats(path: string): Promise<FileStats>;
}

type FileStats = {
  size: number;
  created: Date;
  modified: Date;
  isFile: boolean;
  isDirectory: boolean;
};
```

### Requirements

1. Basic Operations:
    - File reading/writing
    - Directory listing
    - File watching
    - Stats retrieval

2. Path Handling:
    - Path normalization
    - Relative paths
    - Path validation
    - Directory creation

3. Error Management:
    - Permission errors
    - Missing files
    - Invalid paths
    - Resource busy

### Edge Cases to Handle

- File not found
- Permission denied
- Path traversal
- Directory not empty
- Invalid encodings
- Large files
- Locked files
- Concurrent access

### Example

```typescript
// Create file system handler
const fs = new FileSystem({
  basePath: './data',
  defaultEncoding: 'utf8'
});

// Read file
try {
  const content = await fs.readFile('config.json');
  console.log(JSON.parse(content.toString()));
} catch (error) {
  console.error('Failed to read file:', error);
}

// Write file
await fs.writeFile(
  'logs/app.log',
  'Application started\n',
  { flag: 'a' }  // Append mode
);

// List directory
const files = await fs.readDirectory('logs');
console.log('Log files:', files);

// Watch directory
fs.watch('logs', (event, filename) => {
  console.log(`${event} detected for ${filename}`);
});

// Get file stats
const stats = await fs.getStats('config.json');
console.log(stats);
// {
//   size: 1234,
//   created: 2024-01-01T00:00:00.000Z,
//   modified: 2024-01-01T12:00:00.000Z,
//   isFile: true,
//   isDirectory: false
// }
```

## Notes

This exercise tests your ability to:
- Work with file systems
- Handle paths correctly
- Manage errors
- Watch for changes
- Process files safely

Consider:
- Path security
- Error handling
- Performance impact
- Resource cleanup
- Platform differences

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Recursive operations
2. File streams
3. Directory copying
4. File locking
5. Temporary files
6. Atomic writes
7. File permissions
8. Change monitoring

## Real-World Applications

This functionality is commonly used in:
- Configuration management
- Log handling
- Data processing
- File uploads
- Backup systems
- Build tools
- Development tools
- System monitoring
