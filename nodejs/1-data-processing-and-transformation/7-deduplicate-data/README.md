# Data Deduplicator Exercise

## Problem Description

Implement a function that deduplicates an array of objects based on specified fields while maintaining type safety and providing detailed results about the deduplication process.

### Function Signature
```typescript
function deduplicateData<T extends Record<string, unknown>>(
  items: T[],
  options: DedupOptions
): DedupResult<T>
```

### Types
```typescript
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
    { id: 2, name: 'Bob' }     // new index 1
  ],
  duplicatesRemoved: 1,
  indexMap: Map(3) { 
    0 => 0,  // First Alice stayed at index 0
    1 => 1,  // Bob moved to index 1
    2 => 0   // Second Alice was duplicate, points to first Alice's position (0)
  }
}
```

The `indexMap` tells us:
- Where each original item ended up after deduplication
- Which items were considered duplicates of which others (they'll point to the same new index)
- How to map back to the deduplicated data from the original data

This is particularly useful when:
- You need to maintain references to the original data
- You're tracking which items were combined
- You need to map other data structures that referenced the original array
- You want to know which item was kept when duplicates were found

## Notes for Candidates

This exercise tests your ability to:
- Process complex data structures
- Handle multiple strategies for data processing
- Maintain type safety with generics
- Track and report on transformations
- Handle edge cases
- Work with nested data

Consider:
- Performance implications for large datasets
- Memory usage
- Type safety
- Reference equality
- Custom comparison logic

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Start with simple cases and progress to more complex scenarios
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
- Support for async comparators
- Fuzzy matching options
- Performance optimizations for large datasets
- Support for array fields
- Bidirectional index mapping
- Statistics about duplicates

## Real-World Applications

This exercise simulates real-world scenarios like:
- Data cleaning
- API response deduplication
- User record merging
- Event deduplication
- Database record normalization

