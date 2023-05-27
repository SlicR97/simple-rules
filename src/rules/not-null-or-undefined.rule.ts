import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is null or undefined
 */
export namespace NotNullOrUndefined {
  /**
   * Checks if input is null or undefined
   *
   * @param x Input to be checked
   * @returns True if the input is not null or undefined
   */
  export const rule = (x: unknown): boolean => {
    return x !== null && x !== undefined
  }

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <T>(x: T | null | undefined): Maybe<RuleViolation<T | null | undefined>> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'NOT_NULL_OR_UNDEFINED',
      propertyValue: x,
    })
  }
}
