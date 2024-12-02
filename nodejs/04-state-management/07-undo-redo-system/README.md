# Undo/Redo System Exercise

## Exercise Information
- Difficulty: ADVANCED
- Estimated Time: 4-6 hours
- Prerequisites:
    - Advanced TypeScript
    - Command pattern
    - State management
    - Memory management

## Problem Description

Implement an undo/redo system using the command pattern that can track changes, manage history, and handle complex state transformations. This is commonly used in editors, drawing applications, and any system requiring change history.

### Function Signature
```typescript
type Command<T> = {
  execute: () => void | Promise<void>;
  undo: () => void | Promise<void>;
  getDescription: () => string;
  merge?: (next: Command<T>) => boolean;  // Optional command merging
};

type UndoRedoOptions = {
  maxHistory?: number;        // Maximum steps in history
  mergeWindow?: number;      // Time window for merging similar commands (ms)
};

class UndoRedoSystem<T> {
  constructor(options?: UndoRedoOptions);

  // Execute a new command
  execute(command: Command<T>): Promise<void>;

  // Undo last command
  undo(): Promise<void>;

  // Redo last undone command
  redo(): Promise<void>;

  // Check if operations are available
  canUndo(): boolean;
  canRedo(): boolean;

  // Clear history
  clear(): void;

  // Get system status
  getStatus(): UndoRedoStatus;
}

type UndoRedoStatus = {
  undoStack: string[];       // Command descriptions in undo stack
  redoStack: string[];       // Command descriptions in redo stack
  lastOperation: string;     // Last operation performed
  canUndo: boolean;
  canRedo: boolean;
};
```

### Requirements

1. Command Management:
    - Execute commands
    - Track command history
    - Support async commands
    - Command merging

2. History Management:
    - Maintain undo stack
    - Maintain redo stack
    - Handle stack limits
    - Clear history

3. Operation Control:
    - Undo operations
    - Redo operations
    - State validation
    - Error recovery

### Edge Cases to Handle

- Command failures
- Async timing
- Memory limits
- Stack overflow
- Command merging
- Invalid states
- Concurrent operations
- Partial failure

### Example

```typescript
// Text editor command example
class TextCommand implements Command<string> {
  constructor(
    private document: TextDocument,
    private startPos: number,
    private oldText: string,
    private newText: string
  ) {}

  execute() {
    this.document.replaceText(this.startPos, this.oldText, this.newText);
  }

  undo() {
    this.document.replaceText(this.startPos, this.newText, this.oldText);
  }

  getDescription() {
    return `Replace "${this.oldText}" with "${this.newText}"`;
  }

  merge(next: Command<string>) {
    // Merge consecutive single-character typing
    if (next instanceof TextCommand &&
        this.startPos + this.newText.length === next.startPos &&
        this.newText.length === 1 && 
        next.newText.length === 1) {
      this.newText += next.newText;
      return true;
    }
    return false;
  }
}

// Usage
const undoRedo = new UndoRedoSystem<string>({
  maxHistory: 100,
  mergeWindow: 1000  // 1 second
});

// Execute commands
await undoRedo.execute(new TextCommand(doc, 0, "", "Hello"));
await undoRedo.execute(new TextCommand(doc, 5, "", " World"));

// Check status
console.log(undoRedo.getStatus());
// {
//   undoStack: ['Replace "" with "Hello"', 'Replace "" with " World"'],
//   redoStack: [],
//   lastOperation: 'execute',
//   canUndo: true,
//   canRedo: false
// }

// Undo last change
if (undoRedo.canUndo()) {
  await undoRedo.undo();
}

// Redo the change
if (undoRedo.canRedo()) {
  await undoRedo.redo();
}
```

## Notes

This exercise tests your ability to:
- Implement command pattern
- Manage state history
- Handle async operations
- Implement command merging
- Manage memory usage

Consider:
- Memory efficiency
- Command granularity
- Merge strategies
- State consistency
- Performance impact

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Command grouping
2. Selective undo
3. Branch history
4. State snapshots
5. Operation timestamps
6. History persistence
7. Memory optimization
8. Command visualization

## Real-World Applications

This functionality is commonly used in:
- Text editors
- Graphics applications
- Data modeling tools
- Form builders
- Code editors
- Diagram editors
- Spreadsheet applications
- 3D modeling software
