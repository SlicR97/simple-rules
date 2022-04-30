import { Maybe } from "../types/maybe.type";
import { RuleViolation } from "../types/rule-violation.type";

export namespace NotEmpty {
  export const rule = (x: string | any[]): boolean => {
    return x.length !== 0;
  };

  export const errorMessage = "String or array must not be empty.";

  export const validate = (x: string | any[]) => (propertyName: string) : Maybe<RuleViolation> => {
    if (rule(x)) return Maybe.None();
    else return Maybe.Some(RuleViolation.create(propertyName, errorMessage, x));
  }
}
