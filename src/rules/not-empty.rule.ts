import { Maybe } from "../types/maybe.type";
import { RuleViolation } from "../types/rule-violation.type";
import { basicRule } from "./basic.rule";

export namespace NotEmpty {
  export const rule = (x: string | any[]): boolean => {
    return x.length !== 0;
  };

  export const errorMessage = "{propertyName} must not be empty.";

  export const validate = (x: string | any[]) : Maybe<RuleViolation> => {
    return basicRule({
      ruleSatisfied: rule(x),
      errorCode: 'NOT_EMPTY',
      propertyValue: x
    });
  }
}
