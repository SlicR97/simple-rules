import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is between two specified thresholds (including the thresholds)
 */
export namespace InclusiveBetween {
  /**
   * Options for configuring the InclusiveBetween rule
   *
   * @param lowerBound Lower bound of the range
   * @param upperBound Upper bound of the range
   */
  export type Options = {
    lowerBound: number
    upperBound: number
  }

  /**
   * Checks if input is between two specified thresholds
   *
   * @param x Input to be checked
   * @param lowerBound Lower bound of the range
   * @param upperBound Upper bound of the range
   * @returns True if the input is between the two specified thresholds (including the thresholds)
   */
  export const rule = (
    x: number,
    lowerBound: number,
    upperBound: number,
  ): boolean => {
    return x >= lowerBound && x <= upperBound
  }

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param options Validation options
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
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
      basicRule(
        rule(x, options.lowerBound, options.upperBound),
        'INCLUSIVE_BETWEEN',
        x,
      )
}
