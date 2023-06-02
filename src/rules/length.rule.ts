import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property has a certain length
 * (string or array)
 */
export namespace Length {
  /**
   * Options for configuring the Length rule
   *
   * @param other Value to compare against
   */
  export type Options = {
    length: number
  }

  /**
   * Checks if input's length is equal to the supplied property
   *
   * @param x Input to be checked
   * @param length Expected length
   * @returns True if the input's is equal to the expected value
   */
  export const rule = <T extends string | unknown[]>(
    x: T,
    length: number,
  ): boolean => {
    return x.length === length
  }

  /**
   * Partially applied function.
   *
   * @param options Validation options
   * @returns a function that takes a value to validate
   */
  export const validate =
    <T extends string | unknown[]>(options: Options) =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: T): Maybe<RuleViolation<T>> =>
      basicRule(rule(x, options.length), 'LENGTH', x)
}
