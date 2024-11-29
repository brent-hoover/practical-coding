# Data Filtering System Exercise

## Exercise Information
- Difficulty: BEGINNER
- Estimated Time: 2-4 hours
- Prerequisites: TypeScript, boolean logic, object comparison

## Problem Description

Implement a type-safe filtering system that can filter arrays of objects using flexible conditions. This is similar to database WHERE clauses or array filter predicates, but with a declarative configuration approach.

### Function Signature
```typescript
type ComparisonOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';

type FilterCondition<T> = {
  field: keyof T;
  operator: ComparisonOperator;
  value: any;
};

type FilterGroup<T> = {
  combination: 'AND' | 'OR';
  conditions: (FilterCondition<T> | FilterGroup<T>)[];
};

function filterData<T>(
  data: T[],
  filter: FilterCondition<T> | FilterGroup<T>
): T[]
```

### Requirements

1. Basic filtering:
    - Support common comparison operators (eq, neq, gt, gte, lt, lte)
    - Support string operations (contains, startsWith, endsWith)
    - Handle type-safe field access using keyof
    - Return new array with matching items

2. Compound filtering:
    - Combine multiple conditions with AND/OR
    - Support nested filter groups
    - Allow mixing single conditions and groups

3. Type safety:
    - Ensure field names exist on the type
    - Validate operator compatibility with field types
    - Provide helpful type errors

### Edge Cases to Handle

- Empty data arrays
- Missing fields in objects
- Invalid operator for field type
- Null/undefined values
- Case sensitivity in string operations
- Deep property access
- Type coercion scenarios

### Example

```typescript
const data = [
  { id: 1, name: 'John', age: 30, city: 'New York' },
  { id: 2, name: 'Jane', age: 25, city: 'Boston' },
  { id: 3, name: 'Bob', age: 35, city: 'New York' }
];

const filter: FilterGroup<typeof data[0]> = {
  combination: 'AND',
  conditions: [
    {
      field: 'city',
      operator: 'eq',
      value: 'New York'
    },
    {
      field: 'age',
      operator: 'gte',
      value: 30
    }
  ]
};

const result = filterData(data, filter);
// Returns [
//   { id: 1, name: 'John', age: 30, city: 'New York' },
//   { id: 3, name: 'Bob', age: 35, city: 'New York' }
// ]
```

## Notes

This exercise tests your ability to:
- Design flexible, type-safe interfaces
- Implement comparison operations
- Handle complex boolean logic
- Process nested structures
- Write maintainable, extensible code

Consider:
- Performance with large datasets
- Memory usage
- Type safety
- Error handling
- Edge cases

## Getting Started

1. Implement your solution in `src/index.ts`
2. Run tests using `npm test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases

## Extension Ideas

Once you have the basic implementation working, consider adding:
1. Custom comparison operators
2. Case-insensitive string operations
3. Array field operations (any, all, none)
4. Regular expression support
5. Path-based field access (dot notation)
6. Dynamic operator registration

## Real-World Applications

This functionality is commonly used in:
- Search interfaces
- Data grid filtering
- Query builders
- Report generators
- Data analysis tools
