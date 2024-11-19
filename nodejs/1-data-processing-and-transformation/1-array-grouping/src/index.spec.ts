import { describe, it, expect } from 'vitest';
import { groupBy, type DataObject } from './index.js';

describe('groupBy', () => {
  it('should group objects by string field', () => {
    const input: DataObject[] = [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
      { type: 'veg', name: 'carrot' }
    ];

    const expected = {
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' }
      ],
      veg: [
        { type: 'veg', name: 'carrot' }
      ]
    };

    expect(groupBy(input, 'type')).toEqual(expected);
  });

  it('should handle missing fields', () => {
    const input: DataObject[] = [
      { type: 'fruit', name: 'apple' },
      { name: 'banana' },
      { type: 'veg', name: 'carrot' }
    ];

    const expected = {
      fruit: [{ type: 'fruit', name: 'apple' }],
      veg: [{ type: 'veg', name: 'carrot' }],
      undefined: [{ name: 'banana' }]
    };

    expect(groupBy(input, 'type')).toEqual(expected);
  });

  it('should handle empty array', () => {
    expect(groupBy([], 'type')).toEqual({});
  });

  it('should group by number field', () => {
    const input: DataObject[] = [
      { count: 1, name: 'a' },
      { count: 2, name: 'b' },
      { count: 1, name: 'c' }
    ];

    const expected = {
      '1': [
        { count: 1, name: 'a' },
        { count: 1, name: 'c' }
      ],
      '2': [
        { count: 2, name: 'b' }
      ]
    };

    expect(groupBy(input, 'count')).toEqual(expected);
  });

  // Additional TypeScript-specific test
  it('should handle various field types', () => {
    const input: DataObject[] = [
      { value: true, name: 'a' },
      { value: 42, name: 'b' },
      { value: 'string', name: 'c' }
    ];

    const expected = {
      'true': [{ value: true, name: 'a' }],
      '42': [{ value: 42, name: 'b' }],
      'string': [{ value: 'string', name: 'c' }]
    };

    expect(groupBy(input, 'value')).toEqual(expected);
  });

  it('should handle large arrays efficiently', () => {
    const input = Array.from({ length: 10000 }, (_, i) => ({
      type: i % 2 === 0 ? 'even' : 'odd',
      value: i
    }));

    const start = performance.now();
    const result = groupBy(input, 'type');
    const end = performance.now();

    expect(end - start).toBeLessThan(50);
    expect(result.even.length).toBe(5000);
    expect(result.odd.length).toBe(5000);
  });
});
