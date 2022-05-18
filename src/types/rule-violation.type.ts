import { Maybe } from "./maybe.type";

export type RuleViolation = {
  errorCodes: string[];
  propertyValue: Maybe<any>;
  additionalProperties?: Maybe<Record<string, any>>;
}

export namespace RuleViolation {
  export const create = (errorCodes: string[], propertyValue: Maybe<any> = Maybe.None(), additionalProperties: Maybe<Record<string, any>> = Maybe.None()): RuleViolation => {
    if (additionalProperties) return {
      errorCodes,
      propertyValue,
      additionalProperties
    }; else return {
      errorCodes,
      propertyValue
    }
  }
}
