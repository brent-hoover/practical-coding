# Config Version Control Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Version control concepts
    - Schema migrations
    - Error handling

## Problem Description

Implement a configuration version control system that can track config versions, handle migrations, and support rollbacks. This is essential for managing configuration changes over time and ensuring backward compatibility.

### Function Signature
```typescript
type ConfigVersion = {
  version: number;
  timestamp: number;
  changes: Record<string, unknown>;
  author?: string;
  description?: string;
};

type MigrationStep = {
  up: (config: Record<string, unknown>) => Promise<void>;
  down: (config: Record<string, unknown>) => Promise<void>;
  description: string;
};

class ConfigVersionControl {
  constructor(options?: {
    storage?: VersionStorage;
    strict?: boolean;
  });

  // Create new version
  createVersion(
    changes: Record<string, unknown>,
    metadata?: Partial<ConfigVersion>
  ): Promise<number>;

  // Add migration step
  addMigration(
    fromVersion: number,
    toVersion: number,
    migration: MigrationStep
  ): void;

  // Migrate to specific version
  migrateTo(targetVersion: number): Promise<void>;

  // Roll back to previous version
  rollback(): Promise<void>;

  // Get version history
  getHistory(): Promise<ConfigVersion[]>;

  // Get current state
  getCurrentState(): Promise<{
    version: number;
    config: Record<string, unknown>;
  }>;
}
```

### Requirements

1. Version Management:
    - Track configuration versions
    - Store version history
    - Handle version metadata
    - Maintain change logs

2. Migration System:
    - Define migration steps
    - Execute migrations
    - Support rollbacks
    - Validate migrations

3. State Management:
    - Track current state
    - Handle partial migrations
    - Manage rollback state
    - Error recovery

### Edge Cases to Handle

- Failed migrations
- Incomplete rollbacks
- Missing migrations
- Version conflicts
- Data corruption
- Concurrent migrations
- Invalid states
- Storage failures

### Example

```typescript
const versionControl = new ConfigVersionControl();

// Add migration steps
versionControl.addMigration(1, 2, {
  up: async (config) => {
    config.databaseUrl = `mongodb://${config.dbHost}:${config.dbPort}`;
    delete config.dbHost;
    delete config.dbPort;
  },
  down: async (config) => {
    const url = new URL(config.databaseUrl);
    config.dbHost = url.hostname;
    config.dbPort = url.port;
    delete config.databaseUrl;
  },
  description: 'Combine database host and port into URL'
});

// Create new version
const version = await versionControl.createVersion({
  logLevel: 'debug',
  newFeature: true
}, {
  author: 'system',
  description: 'Enable debug logging'
});

// Check history
const history = await versionControl.getHistory();
console.log(history);
// [
//   {
//     version: 1,
//     timestamp: 1621234567890,
//     changes: { logLevel: 'debug', newFeature: true },
//     author: 'system',
//     description: 'Enable debug logging'
//   }
// ]

// Migrate to version
await versionControl.migrateTo(2);

// Roll back if needed
await versionControl.rollback();
```

## Notes

This exercise tests your ability to:
- Implement version control
- Handle migrations
- Manage state
- Handle errors
- Track history

Consider:
- Data consistency
- Migration safety
- Error recovery
- Performance impact
- Storage efficiency

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Migration validation
2. Version branching
3. Conflict resolution
4. Migration dry-run
5. Change diffing
6. Backup/restore
7. Migration dependencies
8. Partial rollbacks

## Real-World Applications

This functionality is commonly used in:
- Database migrations
- Configuration management
- System upgrades
- Feature rollouts
- Schema evolution
- API versioning
- Settings management
- System maintenance
