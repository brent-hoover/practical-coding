# Custom Protocol Parser Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
    - TypeScript
    - Binary data handling
    - Protocol design
    - State machines

## Problem Description

Implement a parser for a custom binary protocol that can handle message framing, state tracking, and error detection. This is commonly used when working with IoT devices, embedded systems, or custom network protocols.

### Function Signature
```typescript
type ParserOptions = {
  maxMessageSize?: number;
  errorCorrection?: boolean;
  strictMode?: boolean;
  debug?: boolean;
};

type Message = {
  type: number;
  sequence: number;
  payload: Buffer;
  checksum: number;
};

class ProtocolParser {
  constructor(options?: ParserOptions);

  // Parse incoming data
  parse(data: Buffer): Message[];

  // Create message
  createMessage(
    type: number,
    payload: Buffer
  ): Buffer;

  // Validate message
  validateMessage(message: Message): boolean;

  // Get parser state
  getState(): ParserState;
}

type ParserState = {
  bytesProcessed: number;
  messagesParsed: number;
  errors: number;
  currentSequence: number;
};
```

### Requirements

1. Message Framing:
    - Start/end markers
    - Length fields
    - Message types
    - Sequence numbers

2. Error Handling:
    - Checksum validation
    - Frame sync recovery
    - Malformed messages
    - Buffer management

3. State Tracking:
    - Parser state
    - Message sequences
    - Error recovery
    - Debug information

### Edge Cases to Handle

- Partial messages
- Invalid checksums
- Buffer overflows
- Lost sync
- Invalid lengths
- Corrupted data
- Split messages
- Sequence errors

### Example

```typescript
// Protocol Format:
// [START_MARKER][TYPE][LENGTH][SEQUENCE][PAYLOAD][CHECKSUM][END_MARKER]
//     1b         1b    2b      2b       Nb       4b        1b

// Create parser
const parser = new ProtocolParser({
  maxMessageSize: 1024,
  errorCorrection: true,
  strictMode: true
});

// Create message
const messageData = parser.createMessage(
  0x01, // Message type
  Buffer.from('Hello, World!')
);

// Parse incoming data
const messages = parser.parse(messageData);
console.log(messages[0]);
// {
//   type: 1,
//   sequence: 1,
//   payload: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>,
//   checksum: 1234567890
// }

// Validate message
const isValid = parser.validateMessage(messages[0]);
console.log(isValid); // true

// Check parser state
console.log(parser.getState());
// {
//   bytesProcessed: 23,
//   messagesParsed: 1,
//   errors: 0,
//   currentSequence: 1
// }
```

## Notes

This exercise tests your ability to:
- Design binary protocols
- Handle message framing
- Implement error detection
- Manage parser state
- Process binary data

Consider:
- Memory efficiency
- Error recovery
- State management
- Performance impact
- Protocol robustness

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Message compression
2. Error correction
3. Protocol versioning
4. Fragmentation
5. Stream processing
6. Protocol analysis
7. State recovery
8. Debug logging

## Real-World Applications

This functionality is commonly used in:
- IoT devices
- Embedded systems
- Custom protocols
- Network analysis
- Binary formats
- Device communication
- Data acquisition
- Testing tools
