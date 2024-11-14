import { describe, it, expect } from 'vitest';
import { deduplicateData, isDuplicate, get, type DedupOptions } from './index.js';

describe('get', () => {
  it('should allow you to fetch the values with keys with nest dot notions', () => {
    const obj = {
      animal: {
        dog: {
          feet: 4
        }
      }
    }
    const path = 'animal.dog.feet';
    const result = get(obj, path);
    expect(result).toBe(4);
  })
})

describe('isDuplicate', () => {
  it('should return true when the record already exists in the record set with one key', () => {
    const itemsWIthDuplicate: Array<{ id: number; name: string }> = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
    ];
    const newItem = { id: 1, name: 'Duplicate' };
    const deDupeOptions: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'first'
    }
    const result = isDuplicate(itemsWIthDuplicate, newItem, deDupeOptions);
    expect(result).toBe(true);
  });

  it('should return true when the record already exists in the record set with two keys', () => {
    const itemsWIthDuplicate: Array<{ id: number; name: string }> = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
    ];
    const newItem = { id: 1, name: 'first' };
    const deDupeOptions: DedupOptions = {
      keys: ['id', 'name'],
      keepStrategy: 'first'
    }
    const result = isDuplicate(itemsWIthDuplicate, newItem, deDupeOptions);
    expect(result).toBe(true);
  });

  it('should return false when the record does not already exists in the record set with one key', () => {
    const itemsWithoutDuplicate: Array<{ id: number; name: string }> = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
    ];
    const newItem = { id: 3, name: 'Not a Duplicate' };
    const deDupeOptions: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'first'
    }
    const result = isDuplicate(itemsWithoutDuplicate, newItem, deDupeOptions);
    expect(result).toBe(false);
  });
})

describe('deduplicateData', () => {
  // Start with simplest case
  it('should handle empty array', () => {
    const options: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'first'
    };

    const result = deduplicateData([], options);
    expect(result.items).toEqual([]);
    expect(result.duplicatesRemoved).toBe(0);
    expect(result.indexMap.size).toBe(0);
  });

  // Single field deduplication
  it('should deduplicate by single field', () => {
    const input = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
      { id: 1, name: 'duplicate' }
    ];

    const options: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'first'
    };

    const result = deduplicateData(input, options);
    expect(result.items).toEqual([
      { id: 1, name: 'first' },
      { id: 2, name: 'second' }
    ]);
    expect(result.duplicatesRemoved).toBe(1);
  });

  // Multiple field deduplication
  it('should deduplicate by multiple fields', () => {
    const input = [
      { name: 'John', age: 30, city: 'NY' },
      { name: 'John', age: 30, city: 'SF' },
      { name: 'John', age: 25, city: 'NY' }
    ];

    const options: DedupOptions = {
      keys: ['name', 'age'],
      keepStrategy: 'first'
    };

    const result = deduplicateData(input, options);
    expect(result.items).toEqual([
      { name: 'John', age: 30, city: 'NY' },
      { name: 'John', age: 25, city: 'NY' }
    ]);
    expect(result.duplicatesRemoved).toBe(1);
  });

  // Keep strategy tests
  it('should respect keepStrategy last', () => {
    const input = [
      { id: 1, version: 1 },
      { id: 1, version: 2 },
      { id: 1, version: 3 }
    ];

    const options: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'last'
    };

    const result = deduplicateData(input, options);
    expect(result.items).toEqual([
      { id: 1, version: 3 }
    ]);
    expect(result.duplicatesRemoved).toBe(2);
  });

  // Custom comparator
  it('should use custom comparator when provided', () => {
    const input = [
      { id: 1, name: 'John' },
      { id: 1, name: 'JOHN' },
      { id: 2, name: 'Jane' }
    ];

    const options: DedupOptions = {
      keys: ['name'],
      keepStrategy: 'first',
      comparators: {
        name: (a: unknown, b: unknown) => {
          if (typeof a === 'string' && typeof b === 'string') {
            return a.toLowerCase() === b.toLowerCase();
          }
          return a === b;
        }
      }
    };

    const result = deduplicateData(input, options);
    expect(result.items).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]);
  });

  // Index mapping
  it('should maintain correct index mapping', () => {
    const input = [
      { id: 1, name: 'first' },
      { id: 2, name: 'second' },
      { id: 1, name: 'duplicate' }
    ];

    const options: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'first'
    };

    const result = deduplicateData(input, options);
    expect(result.indexMap.get(0)).toBe(0); // first item stays at 0
    expect(result.indexMap.get(1)).toBe(1); // second item stays at 1
    expect(result.indexMap.get(2)).toBe(0); // third item (duplicate) maps to 0
  });

  // Nested object handling
  it('should handle nested object fields', () => {
    const input = [
      { user: { id: 1 }, data: 'a' },
      { user: { id: 2 }, data: 'b' },
      { user: { id: 1 }, data: 'c' }
    ];

    const options: DedupOptions = {
      keys: ['user.id'],
      keepStrategy: 'first'
    };

    const result = deduplicateData(input, options);
    expect(result.items).toEqual([
      { user: { id: 1 }, data: 'a' },
      { user: { id: 2 }, data: 'b' }
    ]);
  });

  it('should correctly handle keepStrategy last with multiple similar items', () => {
    const input = [
      { id: 1, value: 'first' },
      { id: 2, value: 'stays' },
      { id: 1, value: 'second' },
      { id: 1, value: 'last' },
      { id: 2, value: 'ignored' }
    ];

    const options: DedupOptions = {
      keys: ['id'],
      keepStrategy: 'last'
    };

    const result = deduplicateData(input, options);

    expect(result.items).toEqual([
      { id: 1, value: 'last' },    // Should keep last occurrence of id:1
      { id: 2, value: 'ignored' }  // Should keep last occurrence of id:2
    ]);
    expect(result.duplicatesRemoved).toBe(3);
    expect(result.indexMap.get(0)).toBe(0); // First id:1 maps to final id:1 position
    expect(result.indexMap.get(1)).toBe(1); // First id:2 maps to final id:2 position
    expect(result.indexMap.get(2)).toBe(0); // Second id:1 maps to final id:1 position
    expect(result.indexMap.get(3)).toBe(0); // Last id:1 maps to final id:1 position
    expect(result.indexMap.get(4)).toBe(1); // Last id:2 maps to final id:2 position
  });
});
