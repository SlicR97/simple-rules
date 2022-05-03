import { Maybe } from "../types/maybe.type";
import { RuleOptions } from "../types/rule-options.type";
import { RuleViolation } from "../types/rule-violation.type";
import { basicRule } from "./basic.rule";

export namespace MinLength {
  type MinLengthOptions = RuleOptions & {
    threshold: number;
  }

  export const rule = (x: string | any[], threshold: number): boolean => {
    return x.length >= threshold;
  };

  export const errorMessage = "{propertyName}'s length must be at least {minLength}.";

  export const validate = (options: MinLengthOptions) => (x: string | any[], propertyName: string) : Maybe<RuleViolation> => {
    return basicRule<MinLengthOptions>({
      options: options,
      ruleSatisfied: rule(x, options.threshold),
      propertyName: propertyName,
      errorMessage: errorMessage,
      propertyValue: x,
      additionalMessageProperties: {
        minLength: options.threshold
      }
    });
  }
}
