# File System Operations Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Async/Await, Error handling

## Problem Description

Create a file management system that can perform common file operations efficiently and safely. This is a fundamental skill needed for handling files, logs, configurations, and data storage in Node.js applications.

### Function Signature
```typescript
type FileOptions = {
  encoding?: BufferEncoding;
  mode?: number;
  flag?: string;
};

class FileManager {
  constructor(basePath: string);

  // Write data to file
  writeFile(
    path: string, 
    data: string | Buffer, 
    options?: FileOptions
  ): Promise<void>;

  // Read file contents
  readFile(
    path: string, 
    options?: FileOptions
  ): Promise<string | Buffer>;

  // Check if file exists
  exists(path: string): Promise<boolean>;

  // Watch file/directory for changes
  watch(
    path: string, 
    onChange: (eventType: string, filename: string) => void
  ): void;

  // List directory contents
  readDir(path: string): Promise<string[]>;
}
```

### Requirements

1. File Operations:
    - Read files safely
    - Write files atomically
    - Handle different encodings
    - Watch for changes

2. Directory Operations:
    - List directory contents
    - Create directories
    - Handle nested paths
    - Clean up resources

3. Error Handling:
    - Permission errors
    - Missing files/directories
    - Invalid paths
    - Lock conflicts

### Example

```typescript
// Create file manager
const files = new FileManager('./data');

// Write file
try {
  await files.writeFile(
    'config.json',
    JSON.stringify({ port: 3000 }, null, 2)
  );
} catch (error) {
  console.error('Failed to write config:', error);
}

// Read file
const content = await files.readFile('config.json', {
  encoding: 'utf8'
});

// Watch for changes
files.watch('config.json', (event, filename) => {
  console.log(`${filename} was ${event}`);
});

// List directory
const entries = await files.readDir('logs');
for (const entry of entries) {
  if (entry.endsWith('.log')) {
    const stats = await files.stat(entry);
    console.log(`${entry}: ${stats.size} bytes`);
  }
}
```

## Notes

This exercise tests your ability to:
- Handle file operations safely
- Manage file system errors
- Work with async operations
- Clean up resources properly

Consider:
- File locking
- Atomic operations
- Error recovery
- Resource cleanup
- Cross-platform paths

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. File streams for large files
2. Directory recursion
3. File type detection
4. File locking
5. Temporary files

## Real-World Applications

This functionality is commonly used in:
- Log management
- Configuration files
- Data storage
- File uploads
- Build tools
- Development utilities
