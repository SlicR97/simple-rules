import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property's value is greater than the threshold passed in the configuration
 */
export namespace GreaterThan {
  /**
   * Options for configuring the GreaterThan rule
   *
   * @param threshold Value to compare against
   */
  export type Options = {
    threshold: number
  }

  /**
   * Checks if input value is greater than the supplied property
   *
   * @param x Input to be checked
   * @param threshold Value to compare against
   * @returns True if the input value is greater than the other value
   */
  export const rule = (x: number, threshold: number): boolean => {
    return x > threshold
  }

  /**
   * Partially applied function.
   *
   * @param options Validation options
   * @returns a function that takes a value to validate
   */
  export const validate =
    (options: Options) =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: number): Maybe<RuleViolation<number>> =>
      basicRule({
        ruleSatisfied: rule(x, options.threshold),
        errorCode: 'GREATER_THAN',
        propertyValue: x,
      })
}
