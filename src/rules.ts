import { Maybe } from "./types/maybe.type";
import { RuleViolation, RuleViolations } from "./types/rule-violation.type";
import { ValidationResult } from './types/validation-result.type';

type NormalRuleFunction<T, TU extends keyof T> = (x: T[TU], propertyName: TU) => Maybe<RuleViolation>;
type NormalRule<T, TU extends keyof T> = [TU, ...(NormalRuleFunction<T, TU>)[]];

type NestedRuleFunction<T, TU extends keyof T> = (t: T[TU]) => ValidationResult<T[TU]>;
type NestedRule<T, TU extends keyof T> = [TU, NestedRuleFunction<T, TU>];

type Rule<T, TU extends keyof T> = NormalRule<T, TU> | NestedRule<T, TU>;

const _validateNestedRule = <T, TU extends keyof T>(
  res: ValidationResult<T>, 
  fn: NestedRuleFunction<T, TU>, 
  t: T, 
  key: TU
): ValidationResult<T> => {
  const nestedRuleViolations = fn(t[key]);
  if (Object.keys(nestedRuleViolations).length) {
    return ValidationResult.apply(res, key, nestedRuleViolations);
  } else {
    return res;
  }
}

const _validateNormalRule = <T, TU extends keyof T>(
  res: ValidationResult<T>,
  fns: NormalRuleFunction<T, TU>[],
  t: T,
  key: TU
): ValidationResult<T> => {
  const ruleViolations = fns
    .map(x => x(t[key], key))
    .filter(x => !!x) as RuleViolations;

  if (ruleViolations.length) {
    return ValidationResult.apply(res, key, ruleViolations);
  } else {
    return res;
  }
}

export const rules = <T>(...rules: Rule<T, keyof T>[]) => (t: T): ValidationResult<T> => rules.reduce((res, rule) => {
  const [key, ...fns] = rule;
  if (fns[0] && fns[0].length === 1) {
    return _validateNestedRule(res, fns[0] as NestedRuleFunction<T, keyof T>, t, key);
  } else {
    return _validateNormalRule(res, fns as NormalRuleFunction<T, keyof T>[], t, key);
  }
}, ValidationResult.empty<T>());
