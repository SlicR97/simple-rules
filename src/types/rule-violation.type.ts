import { Maybe } from "./maybe.type";

export type RuleViolation = {
  propertyName: string;
  errorMessage: string;
  attemptedValue: Maybe<any>;
}

export namespace RuleViolation {
  export const create = (propertyName: string, errorMessage: string, attemptedValue: Maybe<any> = Maybe.None()): RuleViolation => ({
    propertyName,
    errorMessage,
    attemptedValue
  });
}
