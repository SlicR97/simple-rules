import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is null
 */
export namespace Null {
  /**
   * Checks if input is null
   *
   * @param x Input to be checked
   * @returns True if the input is null
   */
  export const rule = (x: unknown): boolean => {
    return x === null
  }

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <T>(x: T | null): Maybe<RuleViolation<T | null>> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'NULL',
      propertyValue: x,
    })
  }
}
