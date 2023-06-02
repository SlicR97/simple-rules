import { Maybe } from '../index'

/**
 * Detail of violated rules on a single property
 * Use RuleViolation.create() for creation
 *
 * @param errorCodes Errors on the property
 * @param propertyValue Value of the property
 * @param additionalProperties Additional parameters of the performed validations
 */
export type RuleViolation<T> = {
  errorCodes: string[]
  propertyValue: Maybe<T>
  additionalProperties?: Maybe<Record<string, unknown>>
}

export namespace RuleViolation {
  /**
   * Creates a new rule violation
   *
   * @param errorCodes Error codes of that validation
   * @param propertyValue value of that property
   * @param additionalProperties Additional parameters of the performed validation
   * @returns A RuleViolation object
   */
  export const create = <TProperty>(
    errorCodes: string[],
    propertyValue: Maybe<TProperty> = undefined,
    additionalProperties: Maybe<Record<string, unknown>> = undefined,
  ): RuleViolation<TProperty> => {
    if (additionalProperties)
      return {
        errorCodes,
        propertyValue,
        additionalProperties,
      }
    else
      return {
        errorCodes,
        propertyValue,
      }
  }

  /**
   * Validates if an object is a rule violation or not
   *
   * @param a object to validate
   */
  export const isRuleViolation = (a: unknown) =>
    typeof a === 'object' &&
    a &&
    'errorCodes' in a &&
    Array.isArray((a as Record<string, string>)['errorCodes']) &&
    'propertyValue' in a

  /**
   * Merges two RuleViolations.
   * If their propertyValues are different,
   * the value of a is taken
   *
   * @param a First object to merge
   * @param b Second object to merge
   * @returns Merged object
   */
  export const merge = <Type>(
    a: RuleViolation<Type>,
    b: RuleViolation<Type>,
  ): RuleViolation<Type> => {
    const merged: RuleViolation<Type> = {
      errorCodes: [...a.errorCodes, ...b.errorCodes],
      propertyValue: a.propertyValue,
    }

    if (a.additionalProperties || b.additionalProperties) {
      merged.additionalProperties = {
        ...a.additionalProperties,
        ...b.additionalProperties,
      }
    }

    return merged
  }
}
