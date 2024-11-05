import { describe, it, expect } from 'vitest';
import { parseCSV } from './index.js';

describe('parseCSV', () => {
  it('should parse basic CSV with headers', () => {
    const input = `name,age,city
Alice,28,New York
Bob,35,San Francisco
Charlie,42,Chicago`;

    expect(parseCSV(input)).toEqual([
      { name: 'Alice', age: '28', city: 'New York' },
      { name: 'Bob', age: '35', city: 'San Francisco' },
      { name: 'Charlie', age: '42', city: 'Chicago' },
    ]);
  });

  it('should handle custom separators', () => {
    const input = `name;age;city
Alice;28;New York
Bob;35;San Francisco`;

    expect(parseCSV(input, { separator: ';' })).toEqual([
      { name: 'Alice', age: '28', city: 'New York' },
      { name: 'Bob', age: '35', city: 'San Francisco' },
    ]);
  });

  it('should handle quoted values with commas', () => {
    const input = `name,address,city
"Smith, John","123 Main St, Apt 4",Boston
"Doe, Jane","456 Oak St, Unit 2",Seattle`;

    expect(parseCSV(input)).toEqual([
      { name: 'Smith, John', address: '123 Main St, Apt 4', city: 'Boston' },
      { name: 'Doe, Jane', address: '456 Oak St, Unit 2', city: 'Seattle' },
    ]);
  });

  it('should handle empty fields', () => {
    const input = `name,age,city
Alice,,New York
Bob,35,
,42,Chicago`;

    expect(parseCSV(input)).toEqual([
      { name: 'Alice', age: '', city: 'New York' },
      { name: 'Bob', age: '35', city: '' },
      { name: '', age: '42', city: 'Chicago' },
    ]);
  });

  it('should parse CSV without headers', () => {
    const input = `Alice,28,New York
Bob,35,San Francisco`;

    expect(parseCSV(input, { hasHeaders: false })).toEqual([
      { column1: 'Alice', column2: '28', column3: 'New York' },
      { column1: 'Bob', column2: '35', column3: 'San Francisco' },
    ]);
  });

  it('should handle empty input', () => {
    expect(parseCSV('')).toEqual([]);
  });

  it('should handle single line input', () => {
    const input = 'name,age,city';
    expect(parseCSV(input)).toEqual([]);
  });

  it('should handle escaped quotes', () => {
    const input = `name,description
"Smith","He said ""Hello"" to everyone"`;

    expect(parseCSV(input)).toEqual([
      { name: 'Smith', description: 'He said "Hello" to everyone' },
    ]);
  });
});
