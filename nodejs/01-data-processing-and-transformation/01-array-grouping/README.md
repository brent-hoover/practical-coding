# Group Objects Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-3 hours
- Prerequisites: Basic TypeScript, array methods, object manipulation

## Problem Description

Implement a function that groups an array of objects by a specified field. This is a common operation when processing data, similar to SQL's GROUP BY clause or LINQ's GroupBy method.

### Function Signature
```typescript
function groupBy(array: DataObject[], field: string): GroupedData
```

### Requirements

The function should:
1. Take an array of objects and a field name as parameters
2. Return an object where:
   - Keys are the unique values of the specified field from the input objects
   - Values are arrays containing all objects that have that value for the specified field

### Edge Cases to Handle

- Empty input arrays (should return an empty object)
- Objects missing the specified field (should be grouped under 'undefined')
- Fields with different types of values (numbers, strings, booleans)

### Example

```typescript
const input = [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'veg', name: 'carrot' }
];

const result = groupBy(input, 'type');

// Result:
{
  fruit: [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' }
  ],
  veg: [
    { type: 'veg', name: 'carrot' }
  ]
}
```

## Notes

This exercise tests your ability to:
- Work with collections of objects
- Handle edge cases gracefully
- Transform data structures
- Write type-safe code
- Think about performance implications

Consider how your solution would scale with:
- Large arrays
- Many different values for the grouping field
- Deeply nested objects

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm run test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases you think of
