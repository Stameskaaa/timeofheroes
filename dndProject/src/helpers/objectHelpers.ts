export function pluckAndJoin<T extends Record<string, any>>(
  key: keyof T & string,
  arr?: T[],
): string {
  return arr?.map((item) => String(item[key])).join(', ') || '';
}

export function hasField<T extends object>(obj: T, key: keyof any): boolean {
  return Boolean((obj as any)[key]);
}
