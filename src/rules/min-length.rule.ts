import { Maybe } from '../types/maybe.type';
import { RuleViolation } from '../types/rule-violation.type';
import { basicRule } from './basic.rule';

/**
 * Validation for minimum 
 * length of a string or array
 */
export namespace MinLength {
  /**
   * Options for configuring the MinLength rule
   * 
   * @param threshold Minimum length required
   */
  export type Options = {
    threshold: number;
  };

  /**
   * Compares a string or array to a threshold
   * 
   * @param x Value to be validated
   * @param threshold Minimum length of the input
   * @returns True if the input is longer than or as long as the threshold
   */
  export const rule = (x: string | unknown[], threshold: number): boolean => {
    return x.length >= threshold;
  };

  /**
   * Partially applied function. Takes in the options for validation,
   * then returns a function that takes a value to validate
   * 
   * @param options Validation options
   * @param x Input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate =
    (options: Options) =>
    (x: string | any[]): Maybe<RuleViolation<string | any[]>> => {
      return basicRule({
        ruleSatisfied: rule(x, options.threshold),
        errorCode: 'MIN_LENGTH',
        propertyValue: x,
        additionalProperties: options,
      });
    };
}
