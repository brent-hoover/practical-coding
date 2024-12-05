# Command Line Tools Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Command line concepts

## Problem Description

Implement common command line tool patterns for handling arguments, processing input/output, and managing CLI applications. This is fundamental for building command line tools and scripts in Node.js.

### Function Signature
```typescript
type CliOptions = {
  name: string;
  version: string;
  description?: string;
};

type CommandOptions = {
  args?: string[];
  flags?: Record<string, boolean>;
  env?: Record<string, string>;
};

class CliTool {
  constructor(options: CliOptions);

  // Parse command line arguments
  parseArgs(argv: string[]): CommandOptions;

  // Read from stdin
  readInput(): Promise<string>;

  // Write to stdout
  writeOutput(data: string): void;

  // Write to stderr
  writeError(error: string): void;

  // Exit process
  exit(code: number): void;
}
```

### Requirements

1. Argument Handling:
    - Parse arguments
    - Handle flags
    - Environment vars
    - Default values

2. Input/Output:
    - Read stdin
    - Write stdout
    - Write stderr
    - Handle pipes

3. Process Control:
    - Exit codes
    - Signals
    - Cleanup
    - Error handling

### Example

```typescript
// Create CLI tool
const cli = new CliTool({
  name: 'mycli',
  version: '1.0.0',
  description: 'Example CLI tool'
});

// Parse arguments
const options = cli.parseArgs(process.argv.slice(2));
console.log(options);
// {
//   args: ['input.txt'],
//   flags: { verbose: true },
//   env: { NODE_ENV: 'development' }
// }

// Read input
const input = await cli.readInput();

// Process data
try {
  const result = processData(input);
  cli.writeOutput(result);
} catch (error) {
  cli.writeError(`Error: ${error.message}`);
  cli.exit(1);
}

// Handle pipe
if (process.stdin.isTTY) {
  cli.writeOutput('Interactive mode');
} else {
  // Process piped input
  handlePipedInput();
}
```

## Notes

This exercise tests your ability to:
- Handle CLI arguments
- Process stdin/stdout
- Handle user input
- Manage process lifecycle
- Handle errors

Consider:
- User experience
- Error messages
- Process signals
- Pipe handling
- Resource cleanup

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Interactive prompts
2. Progress bars
3. Color output
4. Command completion
5. Help generation

## Real-World Applications

This functionality is commonly used in:
- Build tools
- Development utilities
- System scripts
- Data processing
- File operations
- Task automation
- Development tools
- System maintenance
