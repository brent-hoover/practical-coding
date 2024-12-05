import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FileManager } from './index.js';
import fs from 'fs/promises';
import path from 'path';

// Mock fs promises
vi.mock('fs/promises');

describe('FileManager', () => {
  let fileManager: FileManager;
  const testBasePath = './test-data';

  beforeEach(() => {
    fileManager = new FileManager(testBasePath);
    vi.resetAllMocks();
  });

  describe('readFile', () => {
    it('should read file contents correctly', async () => {
      const testContent = 'test content';
      vi.mocked(fs.readFile).mockResolvedValue(Buffer.from(testContent));

      const result = await fileManager.readFile('test.txt');
      expect(result.toString()).toBe(testContent);
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(testBasePath, 'test.txt'),
        expect.any(Object)
      );
    });

    it('should handle different encodings', async () => {
      const testContent = 'test content';
      vi.mocked(fs.readFile).mockResolvedValue(Buffer.from(testContent));

      const result = await fileManager.readFile('test.txt', { encoding: 'utf8' });
      expect(result).toBe(testContent);
    });

    it('should handle file not found error', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('ENOENT'));

      await expect(fileManager.readFile('nonexistent.txt'))
        .rejects.toThrow('File not found');
    });
  });

  describe('writeFile', () => {
    it('should write content to file', async () => {
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await fileManager.writeFile('test.txt', 'new content');
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(testBasePath, 'test.txt'),
        'new content',
        expect.any(Object)
      );
    });

    it('should handle write permission errors', async () => {
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('EACCES'));

      await expect(fileManager.writeFile('test.txt', 'content'))
        .rejects.toThrow('Permission denied');
    });

    it('should create directories if they dont exist', async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await fileManager.writeFile('nested/test.txt', 'content');
      expect(fs.mkdir).toHaveBeenCalledWith(
        path.join(testBasePath, 'nested'),
        { recursive: true }
      );
    });
  });

  describe('exists', () => {
    it('should return true for existing files', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);

      const exists = await fileManager.exists('test.txt');
      expect(exists).toBe(true);
    });

    it('should return false for non-existent files', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('ENOENT'));

      const exists = await fileManager.exists('nonexistent.txt');
      expect(exists).toBe(false);
    });
  });

  describe('watch', () => {
    it('should trigger callback on file changes', async () => {
      const mockWatcher = {
        on: vi.fn(),
        close: vi.fn()
      };
      vi.spyOn(fs, 'watch').mockReturnValue(mockWatcher as any);

      const callback = vi.fn();
      fileManager.watch('test.txt', callback);

      // Simulate file change
      const handlers = mockWatcher.on.mock.calls[0];
      handlers[1]('change', 'test.txt');

      expect(callback).toHaveBeenCalledWith('change', 'test.txt');
    });
  });

  describe('readDir', () => {
    it('should list directory contents', async () => {
      const testFiles = ['file1.txt', 'file2.txt'];
      vi.mocked(fs.readdir).mockResolvedValue(testFiles as any);

      const result = await fileManager.readDir('.');
      expect(result).toEqual(testFiles);
    });

    it('should handle directory not found', async () => {
      vi.mocked(fs.readdir).mockRejectedValue(new Error('ENOENT'));

      await expect(fileManager.readDir('nonexistent'))
        .rejects.toThrow('Directory not found');
    });
  });
});
