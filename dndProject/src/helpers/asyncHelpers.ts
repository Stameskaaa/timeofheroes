export function hasArrayData<T>(value: T[] | null | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0;
}
