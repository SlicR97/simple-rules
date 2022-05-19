import { Maybe, RuleViolation, ValidationResult } from './index';

/**
 * Function that checks a normal rule and 
 * maybe returns a RuleViolation
 * 
 * @param t The property to validata
 */
type NormalRuleFunction<Type, TProperty extends keyof Type> = (
  t: Type[TProperty],
) => Maybe<RuleViolation<Type[TProperty]>>;

/**
 * Tuple of the property key and a function to validate that property
 */
type NormalRule<Type, TProperty extends keyof Type> = [
  TProperty,
  NormalRuleFunction<Type, TProperty>,
];

/**
 * Function that checks a nested rule and
 * returns a ValidationResult
 * 
 * @param t The property to validate
 */
type NestedRuleFunction<Type, TProperty extends keyof Type> = (
  t: Type[TProperty],
) => ValidationResult<Type[TProperty]>;

/**
 * Tuple of the property key and a function to validate the nested property
 */
type NestedRule<Type, TProperty extends keyof Type> = [
  TProperty,
  NestedRuleFunction<Type, TProperty>,
];

/**
 * Function that takes a property and the parent object
 * in order to validate two codependent properties
 * 
 * @param tu The property to validate
 * @param t The parent object
 */
type CodependentRuleFunction<Type, TProperty extends keyof Type> = (
  tu: Type[TProperty],
  t: Type,
) => boolean;

/**
 * Triple of
 * a) The property key
 * b) A function to validate that property
 * c) The error code to return in case the validation fails
 */
type CodependentRule<Type, TProperty extends keyof Type> = [
  TProperty,
  CodependentRuleFunction<Type, TProperty>,
  string,
];

/**
 * Union type of the three different possible rule types
 */
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

/**
 * Partially applied function that takes a set of rules 
 * and applies them against a given object
 * 
 * @param rules The rules to be applied
 * @param t The object to apply the rules to
 * 
 * @returns A ValidationResult of the given type
 */
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
