/**
 * Checks if two values are equivalent
 *
 * @param a
 * @param b
 */
const deepEqual = <T>(a: T, b: T): boolean => {
  if (a === null && b === null) return true

  if (a === null || b === null) return false

  if (Array.isArray(a)) {
    return (
      a.length === (b as unknown[]).length &&
      a.every((x, i) => deepEqual(x, (b as unknown[])[i]))
    )
  }

  if (typeof a === 'object') {
    return Object.keys(a).every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      ),
    )
  }

  return a === b
}

export default deepEqual
