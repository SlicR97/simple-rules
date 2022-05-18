import { Maybe } from "./maybe.type";

export type RuleViolation = {
  errorMessage: string;
  propertyValue: Maybe<any>;
}

export type RuleViolations = RuleViolation[];

export namespace RuleViolation {
  export const create = (errorMessage: string, propertyValue: Maybe<any> = Maybe.None()): RuleViolation => ({
    errorMessage,
    propertyValue
  });
}
