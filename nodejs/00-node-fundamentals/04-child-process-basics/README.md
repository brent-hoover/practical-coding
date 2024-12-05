# Child Process Basics Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Process concepts

## Problem Description

Implement common patterns for working with child processes, handling process communication, and managing process lifecycle. This is fundamental for running external commands and parallel processing in Node.js.

### Function Signature
```typescript
type ProcessOptions = {
  cwd?: string;
  env?: Record<string, string>;
  timeout?: number;
};

type ProcessResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

class ProcessManager {
  constructor(options?: ProcessOptions);

  // Run command
  execute(
    command: string,
    args?: string[]
  ): Promise<ProcessResult>;

  // Run long-running process
  spawn(
    command: string,
    args?: string[]
  ): ChildProcess;

  // Kill process
  kill(pid: number): Promise<boolean>;

  // Get process info
  getProcessInfo(pid: number): ProcessInfo;
}

type ProcessInfo = {
  pid: number;
  running: boolean;
  exitCode?: number;
  runtime: number;
};
```

### Requirements

1. Process Management:
    - Execute commands
    - Spawn processes
    - Kill processes
    - Handle timeouts

2. Process Communication:
    - Standard streams
    - Exit codes
    - Signal handling
    - Environment vars

3. Error Handling:
    - Process errors
    - Timeouts
    - Signal failures
    - Cleanup resources

### Example

```typescript
// Create process manager
const manager = new ProcessManager({
  cwd: './scripts',
  timeout: 5000
});

// Execute command
const result = await manager.execute('ls', ['-la']);
console.log('Files:', result.stdout);

// Spawn long-running process
const process = manager.spawn('node', ['server.js']);

process.stdout.on('data', (data) => {
  console.log('Server output:', data);
});

// Handle process exit
process.on('exit', (code) => {
  console.log('Process exited:', code);
});

// Check process info
console.log(manager.getProcessInfo(process.pid));
// {
//   pid: 1234,
//   running: true,
//   runtime: 1500
// }

// Kill process
await manager.kill(process.pid);
```

## Notes

This exercise tests your ability to:
- Manage processes
- Handle process communication
- Handle process errors
- Clean up resources
- Track process state

Consider:
- Process lifecycle
- Resource cleanup
- Error propagation
- Signal handling
- Performance impact

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Process pools
2. Load balancing
3. IPC channels
4. Process monitoring
5. Auto-restart

## Real-World Applications

This functionality is commonly used in:
- CLI tools
- Build systems
- Development tools
- Service managers
- Task runners
- System automation
- Worker processes
- Background jobs
