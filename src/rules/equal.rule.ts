import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is equal to the property passed in the configuration
 */
export namespace Equal {
  /**
   * Options for configuring the Equal rule
   *
   * @param other Value to compare against
   */
  export type Options<T> = {
    other: T
  }

  /**
   * Checks if input is equal to the supplied property
   *
   * @param x Input to be checked
   * @param other Value to compare against
   * @returns True if the input is equal to the other value
   */
  export const rule = <T>(x: T, other: T): boolean => {
    return x === other
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
        errorCode: 'EQUAL',
        propertyValue: x,
      })
}
