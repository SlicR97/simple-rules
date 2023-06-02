import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for maximum
 * length of a string or array
 */
export namespace MaxLength {
  /**
   * Options for configuring the MaxLength rule
   *
   * @param threshold Maximum length allowed
   */
  export type Options = {
    threshold: number
  }

  /**
   * Compares a string or array to a threshold
   *
   * @param x Value to be validated
   * @param threshold Maximum length of the input
   * @returns True if the input is shorter than or as long as the threshold
   */
  export const rule = (x: string | unknown[], threshold: number): boolean => {
    return x.length <= threshold
  }

  /**
   * Partially applied function.
   *
   * @param options Validation options
   * @returns a function that takes a value to validate
   */
  export const validate =
    <Type extends string | any[]>(options: Options) =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: Type): Maybe<RuleViolation<Type>> => {
      return basicRule(rule(x, options.threshold), 'MAX_LENGTH', x, options)
    }
}
