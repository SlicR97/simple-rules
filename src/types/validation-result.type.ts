import { RuleViolation } from './rule-violation.type';

type ValidationResultField<TU> = RuleViolation | ValidationResult<TU>;
export type ValidationResult<T> = {
  [p in keyof T]?: ValidationResultField<p>;
}

export namespace ValidationResult {
  export const empty = <T>(): ValidationResult<T> => ({});

  export const apply = <T, TU>(
    validationResult: ValidationResult<T>, 
    key: keyof T, 
    violations: ValidationResultField<TU>
  ): ValidationResult<T> => ({
    ...validationResult,
    [key]: violations
  });
}
