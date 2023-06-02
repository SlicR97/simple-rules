import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is undefined
 */
export namespace NotUndefined {
  /**
   * Checks if input is undefined
   *
   * @param x Input to be checked
   * @returns True if the input is not undefined
   */
  export const rule = (x: unknown): boolean => {
    return x !== undefined
  }

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <T>(
    x: T | undefined,
  ): Maybe<RuleViolation<T | undefined>> =>
    basicRule(rule(x), 'NOT_UNDEFINED', x)
}
