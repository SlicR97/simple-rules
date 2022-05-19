import { RuleViolation } from './rule-violation.type';

type ValidationResultField<T, TU extends keyof T> = RuleViolation | ValidationResult<T[TU]>;
export type ValidationResult<T> = {
  [p in keyof T]?: ValidationResultField<T, p>;
}

export namespace ValidationResult {
  export const empty = <T>(): ValidationResult<T> => ({});

  export const apply = <T, TU extends keyof T>(
    validationResult: ValidationResult<T>, 
    key: keyof T, 
    violations: ValidationResultField<T, TU>
  ): ValidationResult<T> => {
    const affectedField = validationResult[key] as ValidationResultField<T, TU>;
    if (!affectedField) {
      return {
        ...validationResult,
        [key]: violations
      };
    } else {
      if (RuleViolation.isRuleViolation(affectedField)) {
        if (!RuleViolation.isRuleViolation(violations)) {
          throw new Error('Cannot merge RuleViolation with a field of type ValidationResult');
        }

        return {
          ...validationResult,
          [key]: RuleViolation.merge(affectedField as RuleViolation, violations as RuleViolation)
        };
      } else {
        throw new Error('Cannot merge ValidationResults');
      }
    }
  };
}
