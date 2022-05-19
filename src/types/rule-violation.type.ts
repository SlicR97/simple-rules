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

  export const isRuleViolation = (a: any) =>
    Array.isArray(a.errorCodes) && a.hasOwnProperty('propertyValue');

  export const merge = (a: RuleViolation, b: RuleViolation): RuleViolation => {
    const merged: RuleViolation = {
      errorCodes: [
        ...a.errorCodes,
        ...b.errorCodes
      ],
      propertyValue: a.propertyValue
    };

    if (a.additionalProperties || b.additionalProperties) {
      merged.additionalProperties = {
        ...a.additionalProperties,
        ...b.additionalProperties
      };
    }

    return merged;
  }
}
