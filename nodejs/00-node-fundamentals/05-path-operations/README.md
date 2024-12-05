                   # Path Operations Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, File system concepts

## Problem Description

Implement common path operations for handling file paths, resolving relative paths, and managing path traversal safely. This is fundamental for working with files and directories in Node.js applications.

### Function Signature
```typescript
type PathOptions = {
  base?: string;
  allowRelative?: boolean;
  platform?: 'posix' | 'win32';
};

class PathHandler {
  constructor(options?: PathOptions);

  // Resolve path
  resolve(...paths: string[]): string;

  // Get relative path
  relative(from: string, to: string): string;

  // Join paths
  join(...paths: string[]): string;

  // Parse path
  parse(path: string): ParsedPath;
}

type ParsedPath = {
  root: string;
  dir: string;
  base: string;
  name: string;
  ext: string;
};
```

### Requirements

1. Path Resolution:
    - Absolute paths
    - Relative paths
    - Path normalization
    - Path joining

2. Path Safety:
    - Path traversal protection
    - Invalid paths
    - Platform differences
    - Symbolic links

3. Path Analysis:
    - Path parsing
    - Extensions
    - Directories
    - Root detection

### Example

```typescript
// Create path handler
const paths = new PathHandler({
  base: '/home/user/app',
  platform: 'posix'
});

// Resolve paths
const fullPath = paths.resolve('config', '../data', './file.txt');
console.log(fullPath);  // /home/user/app/data/file.txt

// Get relative path
const relPath = paths.relative(
  '/home/user/app/config',
  '/home/user/app/data/file.txt'
);
console.log(relPath);  // ../data/file.txt

// Join paths
const joined = paths.join('scripts', 'tools', 'build.js');
console.log(joined);  // scripts/tools/build.js

// Parse path
console.log(paths.parse('/home/user/file.txt'));
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   name: 'file',
//   ext: '.txt'
// }
```

## Notes

This exercise tests your ability to:
- Handle file paths
- Ensure path safety
- Work cross-platform
- Parse path components
- Handle edge cases

Consider:
- Path security
- Platform differences
- Path normalization
- Performance impact
- Edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. URL path handling
2. Path validation
3. Glob patterns
4. Path searching
5. Path watching

## Real-World Applications

This functionality is commonly used in:
- File operations
- Build tools
- Module loaders
- Development tools
- Static file servers
- Configuration systems
- Project scaffolding
- File watchers
