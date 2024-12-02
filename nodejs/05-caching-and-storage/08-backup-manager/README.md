# Backup Manager Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - File system operations
    - Integrity verification
    - Error recovery patterns

## Problem Description

Implement a backup manager that can handle backup strategies, verify data integrity, and manage recovery procedures. This is used to ensure data safety and provide disaster recovery capabilities in storage systems.

### Function Signature
```typescript
type BackupStrategy = 'full' | 'incremental' | 'differential';

type BackupOptions = {
  strategy: BackupStrategy;
  compression?: boolean;
  verify?: boolean;
  maxVersions?: number;
  retention?: number;        // Days to keep backups
};

type BackupMetadata = {
  id: string;
  timestamp: number;
  strategy: BackupStrategy;
  size: number;
  files: number;
  checksum: string;
};

class BackupManager {
  constructor(options: BackupOptions);

  // Create new backup
  backup(source: string): Promise<BackupMetadata>;

  // Restore from backup
  restore(
    backupId: string,
    destination: string
  ): Promise<RestoreResult>;

  // Verify backup integrity
  verify(backupId: string): Promise<VerifyResult>;

  // List available backups
  list(): Promise<BackupMetadata[]>;

  // Clean old backups
  cleanup(): Promise<number>;

  // Get backup status
  getStatus(): BackupStatus;
}

type RestoreResult = {
  success: boolean;
  files: number;
  errors: string[];
  duration: number;
};

type VerifyResult = {
  valid: boolean;
  corrupted: string[];
  missing: string[];
};

type BackupStatus = {
  lastBackup: number;
  totalSize: number;
  backupCount: number;
  strategy: BackupStrategy;
};
```

### Requirements

1. Backup Operations:
    - Multiple backup strategies
    - Compression support
    - Version management
    - Retention policies

2. Recovery Procedures:
    - Full restoration
    - Selective restore
    - Error handling
    - Progress tracking

3. Integrity Management:
    - Checksum verification
    - Corruption detection
    - Missing file handling
    - Version validation

### Edge Cases to Handle

- Partial failures
- Corrupt backups
- Insufficient space
- Large files
- Permission issues
- Concurrent backups
- Interrupted operations
- Version conflicts

### Example

```typescript
const manager = new BackupManager({
  strategy: 'incremental',
  compression: true,
  verify: true,
  maxVersions: 5,
  retention: 30  // 30 days
});

// Create backup
const backup = await manager.backup('./data');
console.log(backup);
// {
//   id: 'backup-2024-01-01-001',
//   timestamp: 1704067200000,
//   strategy: 'incremental',
//   size: 1024000,
//   files: 150,
//   checksum: 'sha256-...'
// }

// Verify backup
const verification = await manager.verify(backup.id);
console.log(verification);
// {
//   valid: true,
//   corrupted: [],
//   missing: []
// }

// Restore backup
const restore = await manager.restore(
  backup.id,
  './recovery'
);
console.log(restore);
// {
//   success: true,
//   files: 150,
//   errors: [],
//   duration: 45000
// }

// Check status
console.log(manager.getStatus());
// {
//   lastBackup: 1704067200000,
//   totalSize: 5120000,
//   backupCount: 3,
//   strategy: 'incremental'
// }
```

## Notes

This exercise tests your ability to:
- Implement backup strategies
- Handle data integrity
- Manage file operations
- Implement recovery procedures
- Track operation progress

Consider:
- Space efficiency
- Data integrity
- Error recovery
- Performance impact
- Resource management

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Encryption support
2. Remote backups
3. Deduplication
4. Parallel processing
5. Backup scheduling
6. Progress reporting
7. Backup chaining
8. Recovery testing

## Real-World Applications

This functionality is commonly used in:
- Database systems
- File storage
- Version control
- Disaster recovery
- System backups
- Cloud storage
- Data archives
- Enterprise systems
