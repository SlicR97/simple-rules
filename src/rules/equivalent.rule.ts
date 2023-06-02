import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property's value is equivalent
 * to the value passed in the configuration
 */
export namespace Equivalent {
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

  /**
   * Options for configuring the Equivalent rule
   *
   * @param other Value to compare against
   */
  export type Options<T> = {
    other: T
  }

  /**
   * Checks if input value is equivalent to the supplied object
   * Warning: This comparison does not test for recursive behavior
   *
   * @param x Input to be checked
   * @param other Value to compare against
   * @returns True if the input value is equivalent to the other value
   */
  export const rule = <T>(x: T, other: T): boolean => {
    return deepEqual(x, other)
  }

  /**
   * Partially applied function.
   *
   * @param options Validation options
   * @returns a function that takes a value to validate
   */
  export const validate =
    <T>(options: Options<T>) =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: T): Maybe<RuleViolation<T>> =>
      basicRule({
        ruleSatisfied: rule(x, options.other),
        errorCode: 'EQUIVALENT',
        propertyValue: x,
      })
}
