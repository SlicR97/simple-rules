import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property's value is less than or equal to the threshold passed in the configuration
 */
export namespace LessThanOrEqual {
  /**
   * Options for configuring the LessThanOrEqual rule
   *
   * @param threshold Value to compare against
   */
  export type Options = {
    threshold: number
  }

  /**
   * Checks if input value is less than or equal to the supplied property
   *
   * @param x Input to be checked
   * @param threshold Value to compare against
   * @returns True if the input value is less than or equal to the other value
   */
  export const rule = (x: number, threshold: number): boolean => {
    return x <= threshold
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
        errorCode: 'LESS_THAN_OR_EQUAL',
        propertyValue: x,
      })
}
