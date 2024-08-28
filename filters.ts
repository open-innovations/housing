/**
 * Kludge-y filter to fix erroneous zeroes
 * 
 * Of course, the number that it's trying to fix might actually *be* zero.
 * There's just no way of knowing.
 * 
 * @param value Input object
 * @param colnames List of columns to fix
 * @returns Updated object
 */
export function fixZeroError(
  value: Record<string, number | unknown>[],
  colnames: string[],
): Record<string, number | null | unknown>[] {
  const v = value;
  for (let i = 0; i < v.length; i++) {
    for (const col of colnames) {
      if (v[i][col] == 0) {
        v[i][col] = null;
      }
    }
  }
  return v;
}
