# Environment Manager Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites:
    - Basic TypeScript
    - Environment variables
    - Basic config management
    - Error handling

## Problem Description

Implement an environment manager that handles configuration for different environments (development, staging, production) with environment-specific defaults, overrides, and secret handling. This is essential for applications that run in multiple environments with different configurations.

### Function Signature
```typescript
type Environment = 'development' | 'test' | 'staging' | 'production';

type EnvConfig = {
  defaults: Record<string, unknown>;
  overrides?: Record<string, unknown>;
  secrets?: string[];
  validation?: Record<string, {
    required: boolean;
    type: 'string' | 'number' | 'boolean';
  }>;
};

class EnvironmentManager {
  constructor(
    configs: Record<Environment, EnvConfig>,
    options?: {
      secretsPath?: string;
      strict?: boolean;
    }
  );

  // Initialize for specific environment
  initialize(env: Environment): Promise<void>;

  // Get config value for current environment
  get<T>(key: string): T;

  // Check if running in specific environment
  is(env: Environment): boolean;

  // Get current environment
  getCurrentEnv(): Environment;

  // Validate current configuration
  validate(): ValidationResult;
}

type ValidationResult = {
  valid: boolean;
  errors: string[];
  missing: string[];
};
```

### Requirements

1. Environment Management:
    - Support multiple environments
    - Load environment-specific configs
    - Handle environment detection
    - Manage environment switching

2. Configuration:
    - Environment-specific defaults
    - Environment overrides
    - Secret management
    - Basic validation

3. Access Control:
    - Type-safe config access
    - Environment checking
    - Validation reporting
    - Error handling

### Edge Cases to Handle

- Missing environment
- Invalid secrets file
- Type mismatches
- Missing required values
- Invalid environment names
- Mixed case environments
- Duplicate configurations
- Secret key conflicts

### Example

```typescript
const manager = new EnvironmentManager({
  development: {
    defaults: {
      port: 3000,
      database: 'localhost:5432',
      debug: true
    },
    secrets: ['API_KEY']
  },
  production: {
    defaults: {
      port: 80,
      database: 'db.production:5432',
      debug: false
    },
    validation: {
      'API_KEY': { required: true, type: 'string' }
    }
  }
});

// Initialize for environment
await manager.initialize('development');

// Access configuration
const port = manager.get<number>('port');
const debug = manager.get<boolean>('debug');

// Check environment
if (manager.is('development')) {
  console.log('Running in development mode');
}

// Validate configuration
const result = manager.validate();
console.log(result);
// {
//   valid: true,
//   errors: [],
//   missing: []
// }
```

## Notes

This exercise tests your ability to:
- Manage environment-specific configuration
- Handle secrets securely
- Implement validation logic
- Provide type-safe access
- Handle environment detection

Consider:
- Security implications
- Configuration isolation
- Error handling strategies
- Type safety
- Validation rules

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Environment inheritance
2. Custom validation rules
3. Secret rotation
4. Environment aliases
5. Configuration freezing
6. Runtime changes
7. Environment groups
8. Configuration encryption

## Real-World Applications

This functionality is commonly used in:
- Application deployment
- Development workflows
- CI/CD pipelines
- Multi-tenant applications
- Cloud services
- Database connections
- API configurations
- Testing frameworks
