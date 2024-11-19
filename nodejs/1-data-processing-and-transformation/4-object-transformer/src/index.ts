export type JsonPrimitive = string | number | boolean | null | undefined;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export function flattenObject(obj: JsonValue): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {};
  const seen = new WeakSet();

  function flatten(current: JsonValue, prefix = ''): void {
    if (typeof current === 'object' && current !== null) {
      if (seen.has(current)) {
        throw new Error('Circular reference detected');
      }
      seen.add(current);

      if (Array.isArray(current)) {
        if (current.length === 0) {
          result[prefix.slice(0, -1)] = current;
        } else {
          current.forEach((item, index) => {
            flatten(item, `${prefix}${index}.`);
          });
        }
      } else {
        if (Object.keys(current).length === 0) {
          result[prefix.slice(0, -1)] = current;
        } else {
          for (const key in current) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
              flatten(current[key], `${prefix}${key}.`);
            }
          }
        }
      }
      seen.delete(current);
    } else {
      result[prefix.slice(0, -1)] = current;
    }
  }

  flatten(obj);
  return result;
}
