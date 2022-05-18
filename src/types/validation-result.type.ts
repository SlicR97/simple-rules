import { RuleViolations } from './rule-violation.type';

export type ValidationResult<T> = {
  [p in keyof T]?: RuleViolations;
}

export namespace ValidationResult {
  export const empty = <T>(): ValidationResult<T> => ({});

  export const apply = <T>(
    validationResult: ValidationResult<T>, 
    key: keyof T, 
    violations: RuleViolations
  ): ValidationResult<T> => ({
    ...validationResult,
    [key]: violations
  });
}
