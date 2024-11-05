import { describe, it, expect } from 'vitest';
import { flattenObject } from './index.js';
import type { JsonObject, JsonValue } from './index.js';

describe('when given a basic object', () => {
  it('should return a flattened object', () => {
    const test: JsonObject = {
      a: 1,
      b: 2,
    };
    const result = flattenObject(test);
    expect(result).toEqual(test);
  });
});

describe('when given a basic nested object', () => {
  it('should return flattened data with dot notation', () => {
    const test: JsonObject = {
      a: { b: { c: 1 }, d: 2 },
      e: 3,
    };
    const result = flattenObject(test);
    expect(result).toEqual({
      'a.b.c': 1,
      'a.d': 2,
      e: 3,
    });
  });
});

describe('when given an object with nested arrays', () => {
  it('should return this flattened data', () => {
    const input: JsonObject = {
      users: [
        { name: 'John', hobbies: ['reading', 'music'] },
        { name: 'Jane', hobbies: ['sports'] },
      ],
    };
    expect(flattenObject(input)).toEqual({
      'users.0.name': 'John',
      'users.0.hobbies.0': 'reading',
      'users.0.hobbies.1': 'music',
      'users.1.name': 'Jane',
      'users.1.hobbies.0': 'sports',
    });
  });
});

describe('when given an object with null and undefined values', () => {
  it('should return this flattened data', () => {
    const input: JsonObject = {
      a: null,
      b: undefined,
      c: { d: null },
    };
    const result = flattenObject(input);
    expect(result).toEqual({
      a: null,
      b: undefined,
      'c.d': null,
    } as Record<string, JsonValue>);
  });
});

describe('when given an object with circular references', () => {
  it('should throw an error', () => {
    const circularObject: JsonObject = {
      a: 1,
      b: {} as JsonObject,
    };
    circularObject.b = circularObject;
    expect(() => flattenObject(circularObject)).toThrow('Circular reference detected');
  });
});

describe('when given an object with empty objects and arrays', () => {
  it('should return this flattened data', () => {
    const input: JsonObject = {
      a: { b: {}, c: [] },
      d: [],
    };
    expect(flattenObject(input)).toEqual({
      'a.b': {},
      'a.c': [],
      d: [],
    });
  });
});
