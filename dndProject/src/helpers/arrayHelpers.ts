export function arrayIsValid(array: unknown): array is unknown[] {
  return Array.isArray(array) && array.length > 0;
}
