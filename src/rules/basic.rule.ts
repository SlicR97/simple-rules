import { Maybe } from "../types/maybe.type";
import { RuleViolation } from "../types/rule-violation.type";

type BasicRuleParameters = {
  ruleSatisfied: boolean;
  errorCode: string;
  propertyValue: any;
  additionalProperties?: Maybe<Record<string, any>>;
}

export const basicRule = ({
  ruleSatisfied,
  errorCode,
  propertyValue,
  additionalProperties = undefined
} : BasicRuleParameters): Maybe<RuleViolation> => {
  if(ruleSatisfied) return Maybe.None();

  return Maybe.Some(RuleViolation.create(
    [errorCode],
    propertyValue,
    additionalProperties
  ));
};
