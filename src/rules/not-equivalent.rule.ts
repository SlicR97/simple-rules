import { Maybe, RuleViolation, basicRule, Equivalent } from '../index'

/**
 * Validation for checking
 * if the property's value is equivalent
 * to the value passed in the configuration
 */
export namespace NotEquivalent {
  /**
   * Options for configuring the NotEquivalent rule
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
   * @returns True if the input value is not equivalent to the other value
   */
  export const rule = <T>(x: T, other: T): boolean => !Equivalent.rule(x, other)

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
      basicRule(rule(x, options.other), 'NOT_EQUIVALENT', x)
}
