import { Maybe } from "./types/maybe.type";
import { RuleViolation, RuleViolations } from "./types/rule-violation.type";
import { ValidationResult } from './types/validation-result.type';

export type RuleFunction<T, TU extends keyof T> = (x: T[TU], propertyName: TU) => Maybe<RuleViolation>;
export type Rule<T, TU extends keyof T> = [TU, ...(RuleFunction<T, TU>)[]];

export const rules = <T>(...rules: Rule<T, keyof T>[]) => (t: T): ValidationResult<T> => rules.reduce((res, rule) => {
  const [key, ...fns] = rule;
  const ruleViolations = fns
    .map(x => x(t[key], key))
    .filter(x => !!x) as RuleViolations;

  if (ruleViolations.length) {
    return ValidationResult.apply(res, key, ruleViolations);
  } else {
    return res;
  }
}, ValidationResult.empty<T>());
