export const removeByProperty = <T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K]
): T[] => array.filter((item) => item[key] !== value);

export const updateByProperty = <T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K],
  updates: Partial<T>
): T[] =>
  array.map((item) => (item[key] === value ? { ...item, ...updates } : item));
