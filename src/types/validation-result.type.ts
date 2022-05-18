import { RuleViolation } from './rule-violation.type';

type ValidationResultField<TU> = RuleViolation | ValidationResult<TU>;
export type ValidationResult<T> = {
  [p in keyof T]?: ValidationResultField<p>;
}

export namespace ValidationResult {
  export const empty = <T>(): ValidationResult<T> => ({});

  export const merge = <T>(a: ValidationResult<T>, b: ValidationResult<T>) => ({
    ...a,
    ...b
  });

  export const apply = <T, TU>(
    validationResult: ValidationResult<T>, 
    key: keyof T, 
    violations: ValidationResultField<TU>
  ): ValidationResult<T> => {
    const affectedField = validationResult[key] as ValidationResultField<keyof T>;
    if (!affectedField) {
      return {
        ...validationResult,
        [key]: violations
      };
    } else {
      if (RuleViolation.isRuleViolation(affectedField)) {
        if (!RuleViolation.isRuleViolation(violations)) {
          throw new Error('Cannot merge ValidationResult with a field of type RuleViolation');
        }

        return {
          ...validationResult,
          [key]: RuleViolation.merge(affectedField as RuleViolation, violations as RuleViolation)
        };
      } else {
        if (RuleViolation.isRuleViolation(violations)) {
          throw new Error('Cannot merge ValidationResult with a field of type RuleViolation');
        }

        return {
          ...validationResult,
          [key]: ValidationResult.merge(affectedField as ValidationResult<TU>, violations as ValidationResult<TU>)
        };
      }
    }
  };
}
