export type DataObject = {
  [key: string]: string | number | boolean | undefined;
};

export type GroupedData = {
  [key: string]: DataObject[];
};

export function groupBy(array: DataObject[], field: string): GroupedData {
  const grouped: GroupedData = {};
  for (const item of array) {
    const value = item[field];
    const key = String(value === undefined ? 'undefined' : value);

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }
  return grouped;
}
