# Basic Config Loader Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - File system operations
    - Environment variables
    - JSON parsing

## Problem Description

Implement a configuration loader that can load and merge configuration from multiple sources including files (JSON/YAML), environment variables, and defaults. This is a fundamental pattern used in most applications for managing configuration.

### Function Signature
```typescript
type ConfigSource = {
  type: 'file' | 'env' | 'defaults';
  path?: string;           // For file sources
  prefix?: string;         // For env variables
  required?: boolean;      // Whether source must exist
};

type ConfigOptions = {
  sources: ConfigSource[];
  schema?: Record<string, {
    type: 'string' | 'number' | 'boolean';
    default?: unknown;
  }>;
};

class ConfigLoader {
  constructor(options: ConfigOptions);

  // Load config from all sources
  load(): Promise<Record<string, unknown>>;

  // Get specific config value
  get<T>(key: string): T;

  // Check if config has key
  has(key: string): boolean;

  // Get raw config object
  getAll(): Record<string, unknown>;
}
```

### Requirements

1. Source Loading:
    - Load from JSON/YAML files
    - Load from environment variables
    - Apply default values
    - Merge multiple sources

2. Basic Validation:
    - Check required sources exist
    - Validate basic types
    - Handle missing values
    - Apply defaults

3. Access Patterns:
    - Get specific values
    - Check key existence
    - Get complete config
    - Type-safe access

### Edge Cases to Handle

- Missing files
- Invalid JSON/YAML
- Type mismatches
- Duplicate keys
- Case sensitivity
- Empty sources
- Invalid paths
- Undefined values

### Example

```typescript
const loader = new ConfigLoader({
  sources: [
    {
      type: 'defaults',
      path: './config.default.json'
    },
    {
      type: 'file',
      path: './config.json',
      required: true
    },
    {
      type: 'env',
      prefix: 'APP_'
    }
  ],
  schema: {
    port: { type: 'number', default: 3000 },
    host: { type: 'string', default: 'localhost' },
    debug: { type: 'boolean', default: false }
  }
});

// Load configuration
const config = await loader.load();

// Access values
const port = loader.get<number>('port');
const host = loader.get<string>('host');

console.log(loader.getAll());
// {
//   port: 3000,
//   host: 'localhost',
//   debug: false
// }
```

## Notes

This exercise tests your ability to:
- Work with multiple data sources
- Handle file operations
- Process environment variables
- Implement type safety
- Merge configuration data

Consider:
- Source priority order
- Type conversion rules
- Error reporting
- Default handling
- Key normalization

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. YAML support
2. Nested key access
3. Type inference
4. Custom parsers
5. Validation rules
6. Environment overrides
7. Source priorities
8. Config freezing

## Real-World Applications

This functionality is commonly used in:
- Application configuration
- Service settings
- Environment management
- Deployment configuration
- Development tooling
- CI/CD pipelines
- Server setup
- Application bootstrapping
