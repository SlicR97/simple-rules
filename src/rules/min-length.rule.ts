import { Maybe } from '../types/maybe.type';
import { RuleViolation } from '../types/rule-violation.type';
import { basicRule } from './basic.rule';

export namespace MinLength {
  type MinLengthOptions = {
    threshold: number;
  };

  export const rule = (x: string | unknown[], threshold: number): boolean => {
    return x.length >= threshold;
  };

  export const validate =
    (options: MinLengthOptions) =>
    (x: string | unknown[]): Maybe<RuleViolation<string | unknown[]>> => {
      return basicRule({
        ruleSatisfied: rule(x, options.threshold),
        errorCode: 'MIN_LENGTH',
        propertyValue: x,
        additionalProperties: options,
      });
    };
}
