import { RuleViolation } from '../index'

/**
 * Single field of a ValidationResult.
 * Can be either a RuleViolation of a ValidationResult
 */
type ValidationResultField<Type, TProperty extends keyof Type> =
  | RuleViolation<Type[TProperty]>
  | ValidationResult<Type[TProperty]>

/**
 * Result of a complete validation of an object
 */
export type ValidationResult<Type> = {
  [key in keyof Type]?: ValidationResultField<Type, key>
}

export namespace ValidationResult {
  /**
   * Creates an empty ValidationResult
   */
  export const empty = <Type>(): ValidationResult<Type> => ({})

  /**
   * Tries to add a violation to an existing ValidationResult
   *
   * @throws Error if fields need to be merged and not both are RuleViolations
   *
   * @param validationResult Existing ValidationResult to add the violation to
   * @param key Key of the property
   * @param violations Violation to be added
   *
   * @returns The ValidationResult with the added violation
   */
  export const apply = <Type, TProperty extends keyof Type>(
    validationResult: ValidationResult<Type>,
    key: keyof Type,
    violations: ValidationResultField<Type, TProperty>,
  ): ValidationResult<Type> => {
    const affectedField = validationResult[key] as ValidationResultField<
      Type,
      TProperty
    >
    if (!affectedField) {
      return {
        ...validationResult,
        [key]: violations,
      }
    } else {
      if (RuleViolation.isRuleViolation(affectedField)) {
        if (!RuleViolation.isRuleViolation(violations)) {
          throw new Error(
            'Cannot merge RuleViolation with a field of type ValidationResult',
          )
        }

        return {
          ...validationResult,
          [key]: RuleViolation.merge(
            affectedField as RuleViolation<Type[TProperty]>,
            violations as RuleViolation<Type[TProperty]>,
          ),
        }
      } else {
        throw new Error('Cannot merge ValidationResults')
      }
    }
  }
}
