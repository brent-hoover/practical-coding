# Module System Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Node.js modules concept
    - Basic file system operations

## Problem Description

Implement a custom module system that can load, cache, and manage module dependencies with proper resolution and circular dependency handling. This helps understand how Node.js manages modules internally.

### Function Signature
```typescript
type ModuleOptions = {
  basePath: string;
  extensions: string[];
  cache?: boolean;
};

type ModuleExports = {
  [key: string]: any;
};

class ModuleSystem {
  constructor(options: ModuleOptions);

  // Load module
  require(id: string): ModuleExports;

  // Register module
  register(
    id: string,
    exports: ModuleExports
  ): void;

  // Clear module cache
  clearCache(id?: string): void;

  // Get module info
  getModuleInfo(id: string): ModuleInfo;
}

type ModuleInfo = {
  id: string;
  filename: string;
  loaded: boolean;
  children: string[];
  parent?: string;
};
```

### Requirements

1. Module Loading:
    - Module resolution
    - Path handling
    - Extension handling
    - Cache management

2. Dependency Management:
    - Circular dependencies
    - Missing modules
    - Module hierarchy
    - Export handling

3. Cache Control:
    - Module caching
    - Cache invalidation
    - Cache clearing
    - Cache status

### Edge Cases to Handle

- Circular dependencies
- Missing modules
- Invalid paths
- Syntax errors
- Cache corruption
- Resolution conflicts
- Invalid exports
- Load failures

### Example

```typescript
// Create module system
const moduleSystem = new ModuleSystem({
  basePath: './src',
  extensions: ['.js', '.json', '.node'],
  cache: true
});

// Register module
moduleSystem.register('config', {
  database: {
    host: 'localhost',
    port: 5432
  }
});

// Load module
const config = moduleSystem.require('config');
console.log(config.database.host);  // localhost

// Load file module
const utils = moduleSystem.require('./utils');
utils.doSomething();

// Check module info
console.log(moduleSystem.getModuleInfo('config'));
// {
//   id: 'config',
//   filename: '/absolute/path/to/config',
//   loaded: true,
//   children: [],
//   parent: undefined
// }

// Clear specific module cache
moduleSystem.clearCache('config');

// Clear all cache
moduleSystem.clearCache();
```

## Notes

This exercise tests your ability to:
- Handle module loading
- Manage dependencies
- Work with caching
- Resolve paths
- Handle errors

Consider:
- Module resolution
- Circular references
- Cache strategies
- Error propagation
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Hot reloading
2. Module versioning
3. Plugin system
4. Module aliasing
5. Load hooks
6. Module bundling
7. Dependency graph
8. Module isolation

## Real-World Applications

This functionality is commonly used in:
- Module bundlers
- Plugin systems
- Test frameworks
- Development tools
- Build systems
- Package managers
- Application loaders
- Hot reloading
