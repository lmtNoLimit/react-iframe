export const omit = (obj: Object, keys: string[]) => {
  const keysSet = new Set(keys)
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keysSet.has(key)))
}
