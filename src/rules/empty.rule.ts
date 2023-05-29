import { Maybe, RuleViolation, basicRule, NotEmpty } from '../index'

/**
 * Validation for checking
 * if the property is empty or not
 */
export namespace Empty {
  /**
   * Checks if input is empty
   *
   * @param x Input to be checked
   * @returns True if the input is empty
   */
  export const rule = (x: string | unknown[]): boolean => !NotEmpty.rule(x)

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <Type extends string | any[]>(
    x: Type,
  ): Maybe<RuleViolation<Type>> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'EMPTY',
      propertyValue: x,
    })
  }
}
