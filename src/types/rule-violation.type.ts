import { Maybe } from './maybe.type';

export type RuleViolation<T> = {
  errorCodes: string[];
  propertyValue: Maybe<T>;
  additionalProperties?: Maybe<Record<string, unknown>>;
};

export namespace RuleViolation {
  export const create = <TProperty>(
    errorCodes: string[],
    propertyValue: Maybe<TProperty> = Maybe.None(),
    additionalProperties: Maybe<Record<string, unknown>> = Maybe.None(),
  ): RuleViolation<TProperty> => {
    if (additionalProperties)
      return {
        errorCodes,
        propertyValue,
        additionalProperties,
      };
    else
      return {
        errorCodes,
        propertyValue,
      };
  };

  export const isRuleViolation = (a: unknown) =>
    typeof a === 'object' &&
    a &&
    'errorCodes' in a &&
    Array.isArray((a as Record<string, string>)['errorCodes']) &&
    'propertyValue' in a;

  export const merge = <Type>(
    a: RuleViolation<Type>,
    b: RuleViolation<Type>,
  ): RuleViolation<Type> => {
    const merged: RuleViolation<Type> = {
      errorCodes: [...a.errorCodes, ...b.errorCodes],
      propertyValue: a.propertyValue,
    };

    if (a.additionalProperties || b.additionalProperties) {
      merged.additionalProperties = {
        ...a.additionalProperties,
        ...b.additionalProperties,
      };
    }

    return merged;
  };
}
