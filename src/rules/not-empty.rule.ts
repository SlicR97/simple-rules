import { Maybe, RuleViolation, basicRule } from '../index'

/**
 * Validation for checking
 * if the property is empty or not
 */
export namespace NotEmpty {
  /**
   * Checks if input is empty
   *
   * @param x Input to be checked
   * @returns True if the input is not empty
   */
  export const rule = (x: string | unknown[]): boolean => {
    return x.length !== 0
  }

  /**
   * Takes a value to validate and returns the result of the validation
   *
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = <Type extends string | any[]>(
    x: Type,
  ): Maybe<RuleViolation<Type>> => basicRule(rule(x), 'NOT_EMPTY', x)
}
