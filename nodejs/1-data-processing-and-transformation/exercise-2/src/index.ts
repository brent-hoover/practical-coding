export type ParsedData = {
  [key: string]: string;
}[];

function splitWithQuotes(str: string, customSeparator: string | undefined): string[] {
  const separator: string = customSeparator || ',';
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    // handle escaped quotes within the string
    if (str[i] === '"' && str[i + 1] === '"') {
      current += str[i];
      i += 1;
      continue;
    }
    if (str[i] === '"') {
      // if inQuotes is already set to true, then we're on a closing quote
      if (inQuotes) {
        result.push(current);
        current = '';
        i += 1;
        inQuotes = false;
        continue;
      }
      // if not inQuotes, then we're on an opening quote, skip over it and set inQuotes to true
      inQuotes = true;
      continue;
    }
    if (inQuotes) {
      current += str[i];
      continue;
    }
    if (str[i] === separator || i === str.length - 1) {
      if (i === str.length - 1 && str[i] !== ',') current += str[i]; // if we are at the last character, push it
      result.push(current);
      current = '';
    } else {
      current += str[i];
    }
  }
  if (inQuotes) {
    throw new Error('Unclosed quote in CSV line');
  }
  return result;
}

function buildDefaultHeaders(numColumns: number): string[] {
  const headers = [];
  for (let i = 0; i < numColumns; i++) {
    headers.push(`column${i + 1}`);
  }
  return headers;
}

export function parseCSV(
  csv: string,
  options: {
    separator?: string;
    hasHeaders?: boolean;
  } = {}
): ParsedData {
  const lines = csv.split('\n');
  if (!lines.length) {
    return [];
  }
  let headers;
  if (options.hasHeaders || options.hasHeaders === undefined) {
    const headersRow: string = lines.shift()!;
    headers = splitWithQuotes(headersRow, options.separator);
  } else {
    // If no headers are provided, build a default header row based on the first line of data
    const rowLength = splitWithQuotes(lines[0], options.separator).length;
    headers = buildDefaultHeaders(rowLength);
  }

  const results: ParsedData = [];
  for (let x = 0; x < lines.length; x++) {
    const row = splitWithQuotes(lines[x], options.separator);
    const lineObject: { [key: string]: string } = {};
    for (let y = 0; y < headers.length; y++) {
      lineObject[headers[y]] = row[y] || '';
    }
    results.push(lineObject);
  }
  return results;
}
