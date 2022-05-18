import { Maybe } from "./types/maybe.type";
import { RuleViolation } from "./types/rule-violation.type";
import { ValidationResult } from './types/validation-result.type';

type NormalRuleFunction<T, TU extends keyof T> = (t: T[TU]) => Maybe<RuleViolation>;
type NormalRule<T, TU extends keyof T> = [TU, NormalRuleFunction<T, TU>];

type NestedRuleFunction<T, TU extends keyof T> = (t: T[TU]) => ValidationResult<T[TU]>;
type NestedRule<T, TU extends keyof T> = [TU, NestedRuleFunction<T, TU>];

type CodependentRuleFunction<T, TU extends keyof T> = (tu: T[TU], t: T) => boolean;
type CodependentRule<T, TU extends keyof T> = [TU, CodependentRuleFunction<T, TU>, string];

type Rule<T, TU extends keyof T> = NormalRule<T, TU> | NestedRule<T, TU> | CodependentRule<T, TU>;

const _validateCodependentRule = <T, TU extends keyof T>(
  res: ValidationResult<T>,
  fn: CodependentRuleFunction<T, TU>,
  t: T,
  key: TU,
  errorCode: string
): ValidationResult<T> => {
  const ruleViolation = fn(t[key], t);
  if (ruleViolation) {
    return ValidationResult.apply(res, key, RuleViolation.create([errorCode], t[key]));
  } else {
    return res;
  }
}

const _validateNormalOrNestedRule = <T, TU extends keyof T>(
  res: ValidationResult<T>,
  fn: NormalRuleFunction<T, TU> | NestedRuleFunction<T, TU>,
  t: T,
  key: TU
): ValidationResult<T> => {
  const ruleViolation = fn(t[key]);
  if (ruleViolation && Object.keys(ruleViolation).length) {
    return ValidationResult.apply(res, key, ruleViolation);
  } else {
    return res;
  }
}

const isCodependentRuleFunction = <T, TU extends keyof T>(fn: NormalRuleFunction<T, TU> | NestedRuleFunction<T, TU> | CodependentRuleFunction<T, TU>) =>
  fn.length === 2; 

export const rules = <T>(...rules: Rule<T, keyof T>[]) => (t: T): ValidationResult<T> => rules.reduce((res, rule) => {
  const [key, fn, errorCode] = rule;
  if (isCodependentRuleFunction(fn)) {
    return _validateCodependentRule(res, fn as CodependentRuleFunction<T, keyof T>, t, key, errorCode!);
  } else {
    return _validateNormalOrNestedRule(res, fn as NormalRuleFunction<T, keyof T> | NestedRuleFunction<T, keyof T>, t, key);
  }
}, ValidationResult.empty<T>());
