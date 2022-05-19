import { RuleViolation } from './rule-violation.type';

type ValidationResultField<Type, TProperty extends keyof Type> = RuleViolation<Type[TProperty]> | ValidationResult<Type[TProperty]>;
export type ValidationResult<Type> = {
  [key in keyof Type]?: ValidationResultField<Type, key>;
}

export namespace ValidationResult {
  export const empty = <Type>(): ValidationResult<Type> => ({});

  export const apply = <Type, TProperty extends keyof Type>(
    validationResult: ValidationResult<Type>, 
    key: keyof Type, 
    violations: ValidationResultField<Type, TProperty>
  ): ValidationResult<Type> => {
    const affectedField = validationResult[key] as ValidationResultField<Type, TProperty>;
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
          [key]: RuleViolation.merge(affectedField as RuleViolation<Type[TProperty]>, violations as RuleViolation<Type[TProperty]>)
        };
      } else {
        throw new Error('Cannot merge ValidationResults');
      }
    }
  };
}
