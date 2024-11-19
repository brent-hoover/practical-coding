# CSV Parser Exercise

## Problem Description

Implement a function that parses CSV (Comma-Separated Values) text into an array of objects. This is a common task when processing data files, API responses, or user uploads.

### Function Signature
```typescript
function parseCSV(
  csv: string, 
  options: {
    separator?: string;
    hasHeaders?: boolean;
  } = {}
): ParsedData
```

### Requirements

The parser should handle:

1. Basic CSV parsing with header row (default behavior)
   - First row defines object property names
   - Subsequent rows become object values

2. Quoted values
   - Values containing commas should be enclosed in quotes
   - Values containing quotes should escape the quotes by doubling them

3. Configuration options:
   - Custom separators (e.g., semicolons instead of commas)
   - Optional headers (generate column names if headers aren't present)

4. Edge cases:
   - Empty fields
   - Empty input
   - Single line input
   - Quoted fields with commas
   - Escaped quotes within quoted fields

### Example

```typescript
const input = `name,age,city
Alice,28,New York
Bob,35,San Francisco`;

const result = parseCSV(input);

// Result:
[
  { name: 'Alice', age: '28', city: 'New York' },
  { name: 'Bob', age: '35', city: 'San Francisco' }
]
```

### Edge Case Examples

1. Quoted values with commas:
```csv
name,address
"Doe, John","123 Main St, Apt 4"
```

2. Empty fields:
```csv
name,age,city
Alice,,New York
```

3. Escaped quotes:
```csv
name,quote
"Smith","He said ""Hello"" there"
```

## Notes for Candidates

This exercise tests your ability to:
- Parse and transform text data
- Handle complex string manipulation
- Deal with edge cases and error conditions
- Implement configurable behavior
- Write robust, maintainable code

Consider:
- How would your solution handle malformed input?
- What are the performance implications for large CSV files?
- How would you extend this to handle more complex CSV features (like newlines in quoted fields)?

## Getting Started

1. Implement your solution in `index.ts`
2. Run tests using `npm run test`
3. Ensure all test cases pass
4. Consider adding additional test cases for edge cases you think of

## Extension Ideas

Once you have the basic implementation working, consider adding:
- Support for newlines within quoted fields
- Type inference for numeric fields
- Error handling for malformed CSV
- Stream processing for large files
