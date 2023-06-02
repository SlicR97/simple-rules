import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property has a certain length
 * (string or array)
 */
export namespace Matches {
  /**
   * Options for configuring the Matches rule
   *
   * @param regex Regex to match against
   */
  export type Options = {
    regex: RegExp
  }

  /**
   * Checks if input matches the supplied regex
   *
   * @param x Input to be checked
   * @param regex Regex to match against
   * @returns True if the input matches the regex
   */
  export const rule = (x: string, regex: RegExp): boolean => {
    return regex.test(x)
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
    (x: string): Maybe<RuleViolation<string>> =>
      basicRule(rule(x, options.regex), 'MATCHES', x)
}
