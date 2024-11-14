export type DedupOptions = {
  // Fields to consider when determining uniqueness
  keys: string[];
  // Keep first or last occurrence of duplicate
  keepStrategy: 'first' | 'last';
  // Optional custom comparison function for specific fields
  comparators?: {
    [key: string]: (a: any, b: any) => boolean;
  };
};

export type DedupResult<T> = {
  // Deduplicated items
  items: T[];
  // Number of duplicates removed
  duplicatesRemoved: number;
  // Map of original indices to new indices
  indexMap: Map<number, number>;
};

function simpleEquals(a: unknown, b: unknown): boolean {
  return a === b;
}

export function get<T, U>(obj: T, path: string, defaultValue?: U): U | undefined {
  const result = path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return (result !== undefined ? result : defaultValue) as U | undefined;
}

function isEqual(a: any, b: any, comparators: { [key: string]: (a: any, b: any) => boolean }): boolean {
  let isEqual = true;
  for (const comparator of Object.values(comparators)) {
    if (!comparator(a, b)) {
      isEqual = false;
      break;
    }
  }
  return isEqual;
}

export function isDuplicate<T extends Record<string, unknown>>(
  items: T[],
  record: T,
  options: DedupOptions
): boolean {
  const comparators = options.comparators || { simpleEquals: simpleEquals }
  let isDuplicate = false;
  for (const item of items) {
    let found = 0;
    for (const key of options.keys) {
      if (isEqual(get(item, key), get(record, key), comparators)) {
        found += 1;
      }
    }
    if (found === options.keys.length) {
      isDuplicate = true;
      break;
    }
  }
  return isDuplicate;
}


function filterByKeys<T extends Record<string, unknown>>(record: T, keys: string[]): boolean {
  let found = 0;
  for (const key of keys) {
    if (get(record, key)) found += 1;
  }
  return found === keys.length;
}

export function deduplicateData<T extends Record<string, unknown>>(
  items: T[],
  options: DedupOptions
): DedupResult<T> {
  const dedupeResult: DedupResult<T> = {
    items: [],
    duplicatesRemoved: 0,
    indexMap: new Map(),
  }
  const uniqueItems: T[] = [];
  let currentRecordIndex = 0;
  for (const item of items) {
    let foundIndex = 0;
    if (isDuplicate(uniqueItems, item, options)) {
      dedupeResult.duplicatesRemoved += 1;
      if (options.keepStrategy === 'last') {
        foundIndex = items.findIndex((item) => {
          return filterByKeys(item, options.keys)
        })
        uniqueItems[foundIndex] = item;
      }
      dedupeResult.indexMap.set(currentRecordIndex, foundIndex)
    } else {
      uniqueItems.push(item)
      dedupeResult.indexMap.set(currentRecordIndex, currentRecordIndex)
    }
    currentRecordIndex += 1;
  }
  dedupeResult.items = uniqueItems;
  return dedupeResult;
}
