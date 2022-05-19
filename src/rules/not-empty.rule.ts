import { Maybe } from '../types/maybe.type';
import { RuleViolation } from '../types/rule-violation.type';
import { basicRule } from './basic.rule';

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
    return x.length !== 0;
  };

  /**
   * Takes a value to validate and returns the result of the validation
   * 
   * @param x input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = (
    x: string | any[],
  ): Maybe<RuleViolation<string | any[]>> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'NOT_EMPTY',
      propertyValue: x,
    });
  };
}
