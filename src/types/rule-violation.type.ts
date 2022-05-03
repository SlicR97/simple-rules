import { Maybe } from "./maybe.type";

export type RuleViolation = {
  propertyName: string;
  errorMessage: string;
  propertyValue: Maybe<any>;
}

export type RuleViolations = RuleViolation[];

export namespace RuleViolation {
  export const create = (propertyName: string, errorMessage: string, propertyValue: Maybe<any> = Maybe.None()): RuleViolation => ({
    propertyName,
    errorMessage,
    propertyValue
  });
}
