import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hello, greet } from './index.js';

describe('greet', () => {
  it('should return greeting with name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});

describe('hello', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return greeting with API response', async () => {
    const mockResponse = { message: 'Hi!' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await hello('World');
    expect(result).toBe('Hello, World! Server says: Hi!');
  });

  it('should handle API errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await hello('World');
    expect(result).toBe('Hello, World!');
  });

  it('should handle non-ok responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const result = await hello('World');
    expect(result).toBe('Hello, World!');
  });
});
