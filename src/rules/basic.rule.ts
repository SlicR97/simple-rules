import { Maybe } from '../types/maybe.type';
import { RuleViolation } from '../types/rule-violation.type';

type BasicRuleParameters<TProperty> = {
  ruleSatisfied: boolean;
  errorCode: string;
  propertyValue: TProperty;
  additionalProperties?: Maybe<Record<string, unknown>>;
};

export const basicRule = <TProperty>({
  ruleSatisfied,
  errorCode,
  propertyValue,
  additionalProperties = undefined,
}: BasicRuleParameters<TProperty>): Maybe<RuleViolation<TProperty>> => {
  if (ruleSatisfied) return Maybe.None();

  return Maybe.Some(
    RuleViolation.create<TProperty>(
      [errorCode],
      propertyValue,
      additionalProperties,
    ),
  );
};
