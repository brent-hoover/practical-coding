# Error Handling Patterns Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, Error handling concepts

## Problem Description

Implement common error handling patterns for managing errors, providing useful error information, and handling recovery scenarios. This is fundamental for building robust and reliable Node.js applications.

### Function Signature
```typescript
type ErrorOptions = {
  cause?: Error;
  code?: string;
  data?: Record<string, unknown>;
};

class ErrorHandler {
  constructor();

  // Create custom error
  createError(
    message: string,
    options?: ErrorOptions
  ): CustomError;

  // Handle error
  handle(error: Error): ErrorResult;

  // Try operation with recovery
  tryOperation<T>(
    operation: () => Promise<T>,
    recovery?: (error: Error) => Promise<T>
  ): Promise<T>;
}

type ErrorResult = {
  handled: boolean;
  recovered: boolean;
  error: Error;
};
```

### Requirements

1. Error Creation:
    - Custom errors
    - Error causes
    - Error codes
    - Additional data

2. Error Handling:
    - Error types
    - Stack traces
    - Recovery options
    - Cleanup actions

3. Error Recovery:
    - Retry logic
    - Fallbacks
    - Cleanup
    - Reporting

### Example

```typescript
// Create error handler
const errors = new ErrorHandler();

// Create custom error
const dbError = errors.createError('Database connection failed', {
  code: 'DB_ERROR',
  cause: originalError,
  data: { connectionId: '123' }
});

// Handle error
const result = errors.handle(dbError);
console.log(result);
// {
//   handled: true,
//   recovered: false,
//   error: [Error object]
// }

// Try operation with recovery
const data = await errors.tryOperation(
  async () => {
    return await database.query('SELECT * FROM users');
  },
  async (error) => {
    // Recovery: use backup database
    return await backupDb.query('SELECT * FROM users');
  }
);
```

## Notes

This exercise tests your ability to:
- Handle errors properly
- Provide error context
- Manage recovery
- Clean up resources
- Track error info

Consider:
- Error propagation
- Recovery strategies
- Resource cleanup
- Performance impact
- Error tracking

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Error chains
2. Retry strategies
3. Error events
4. Error logging
5. Error analysis

## Real-World Applications

This functionality is commonly used in:
- API servers
- Database operations
- File handling
- Network requests
- Service integration
- Task processing
- Worker processes
- System automation
