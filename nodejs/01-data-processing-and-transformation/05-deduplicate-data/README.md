# Data Deduplicator Exercise

## Exercise Information
- Difficulty: INTERMEDIATE
- Estimated Time: 3-4 hours
- Prerequisites:
   - TypeScript generics
   - Object comparison strategies
   - Type safety concepts
   - Hash map operations

## Problem Description

Implement a function that deduplicates an array of objects based on specified fields while maintaining type safety and providing detailed results about the deduplication process.

### Function Signature
```typescript
function deduplicateData<T extends Record<string, unknown>>(
  items: T[],
  options: DedupOptions
): DedupResult<T>

type DedupOptions = {
  keys: string[];
  keepStrategy: 'first' | 'last';
  comparators?: {
    [key: string]: (a: any, b: any) => boolean;
  };
};

type DedupResult<T> = {
  items: T[];
  duplicatesRemoved: number;
  indexMap: Map<number, number>;
};
```

### Requirements

The function should:

1. Basic Deduplication:
   - Remove duplicates based on specified key fields
   - Support single or multiple fields for uniqueness
   - Maintain type safety for input and output

2. Flexibility:
   - Support 'first' or 'last' occurrence retention
   - Allow custom comparison functions for specific fields
   - Handle nested object fields

3. Result Tracking:
   - Count removed duplicates
   - Map original indices to new indices
   - Preserve object references when possible

### Edge Cases to Handle

1. Empty arrays
2. Single field vs multiple fields
3. Nested object fields
4. Case-sensitive vs case-insensitive comparison
5. Custom equality comparisons
6. Maintaining reference equality

### Example

```typescript
const input = [
  { id: 1, name: 'first' },
  { id: 2, name: 'second' },
  { id: 1, name: 'duplicate' }
];

const result = deduplicateData(input, {
  keys: ['id'],
  keepStrategy: 'first'
});

// Result:
{
  items: [
    { id: 1, name: 'first' },
    { id: 2, name: 'second' }
  ],
  duplicatesRemoved: 1,
  indexMap: Map(3) { 0 => 0, 1 => 1, 2 => 0 }
}
```

### Index Mapping Explanation

The `indexMap` in the result tracks where each item from the original array ended up in the deduplicated array. This is useful for maintaining relationships between the original and deduplicated data.

For example:
```typescript
const input = [
  { id: 1, name: 'Alice' },    // original index 0
  { id: 2, name: 'Bob' },      // original index 1
  { id: 1, name: 'Alice v2' }  // original index 2
];

const result = deduplicateData(input, {
  keys: ['id'],
  keepStrategy: 'first'
});

// Result:
{
  items: [
    { id: 1, name: 'Alice' },  // new index 0
