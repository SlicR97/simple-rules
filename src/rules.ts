import { Maybe } from './types/maybe.type';
import { RuleViolation } from './types/rule-violation.type';
import { ValidationResult } from './types/validation-result.type';

type NormalRuleFunction<Type, TProperty extends keyof Type> = (
  t: Type[TProperty],
) => Maybe<RuleViolation<Type[TProperty]>>;
type NormalRule<Type, TProperty extends keyof Type> = [
  TProperty,
  NormalRuleFunction<Type, TProperty>,
];

type NestedRuleFunction<Type, TProperty extends keyof Type> = (
  t: Type[TProperty],
) => ValidationResult<Type[TProperty]>;
type NestedRule<Type, TProperty extends keyof Type> = [
  TProperty,
  NestedRuleFunction<Type, TProperty>,
];

type CodependentRuleFunction<Type, TProperty extends keyof Type> = (
  tu: Type[TProperty],
  t: Type,
) => boolean;
type CodependentRule<Type, TProperty extends keyof Type> = [
  TProperty,
  CodependentRuleFunction<Type, TProperty>,
  string,
];

type Rule<Type, TProperty extends keyof Type> =
  | NormalRule<Type, TProperty>
  | NestedRule<Type, TProperty>
  | CodependentRule<Type, TProperty>;

const _validateCodependentRule = <Type, TProperty extends keyof Type>(
  res: ValidationResult<Type>,
  fn: CodependentRuleFunction<Type, TProperty>,
  t: Type,
  key: TProperty,
  errorCode: string,
): ValidationResult<Type> => {
  const ruleViolation = fn(t[key], t);
  if (ruleViolation) {
    return ValidationResult.apply(
      res,
      key,
      RuleViolation.create([errorCode], t[key]),
    );
  } else {
    return res;
  }
};

const _validateNormalOrNestedRule = <Type, TProperty extends keyof Type>(
  res: ValidationResult<Type>,
  fn: NormalRuleFunction<Type, TProperty> | NestedRuleFunction<Type, TProperty>,
  t: Type,
  key: TProperty,
): ValidationResult<Type> => {
  const ruleViolation = fn(t[key]);
  if (ruleViolation && Object.keys(ruleViolation).length) {
    return ValidationResult.apply(res, key, ruleViolation);
  } else {
    return res;
  }
};

const isCodependentRuleFunction = <Type, TProperty extends keyof Type>(
  fn:
    | NormalRuleFunction<Type, TProperty>
    | NestedRuleFunction<Type, TProperty>
    | CodependentRuleFunction<Type, TProperty>,
) => fn.length === 2;

export const rules =
  <Type>(...rules: Rule<Type, keyof Type>[]) =>
  (t: Type): ValidationResult<Type> =>
    rules.reduce((res, rule) => {
      const [key, fn, errorCode] = rule;
      if (isCodependentRuleFunction(fn)) {
        return _validateCodependentRule(
          res,
          fn as CodependentRuleFunction<Type, keyof Type>,
          t,
          key,
          errorCode ?? 'VALIDATION_ERROR',
        );
      } else {
        return _validateNormalOrNestedRule(
          res,
          fn as
            | NormalRuleFunction<Type, keyof Type>
            | NestedRuleFunction<Type, keyof Type>,
          t,
          key,
        );
      }
    }, ValidationResult.empty<Type>());
