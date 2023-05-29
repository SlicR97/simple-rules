import { Maybe, RuleViolation, basicRule, NotNullOrUndefined } from '../index'

/**
 * Validation for checking
 * if the property is null or undefined
 */
export namespace NullOrUndefined {
  /**
   * Checks if input is null or undefined
   *
   * @param x Input to be checked
   * @returns True if the input is null or undefined
   */
  export const rule = (x: unknown): boolean => !NotNullOrUndefined.rule(x)

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <T>(
    x: T | null | undefined,
  ): Maybe<RuleViolation<T | null | undefined>> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'NULL_OR_UNDEFINED',
      propertyValue: x,
    })
  }
}
