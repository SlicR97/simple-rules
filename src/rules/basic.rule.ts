import { Maybe } from "../types/maybe.type";
import { RuleOptions } from "../types/rule-options.type";
import { RuleViolation } from "../types/rule-violation.type";
import { formatError } from "../util/format-error";

type BasicRuleParameters<TOptions extends RuleOptions> = {
  options: Maybe<TOptions>;
  ruleSatisfied: boolean;
  propertyName: string;
  errorMessage: string;
  propertyValue: any;
  additionalMessageProperties: Record<string, any>;
}

export const basicRule = <TOptions extends RuleOptions>(parameters: BasicRuleParameters<TOptions>): Maybe<RuleViolation> => {
  if(parameters.ruleSatisfied) return Maybe.None();

  const _errorMessage = parameters.options?.errorMessage ?? parameters.errorMessage;
  return Maybe.Some(RuleViolation.create(
    formatError(_errorMessage, { 
      propertyName: parameters.propertyName, 
      propertyValue: parameters.propertyValue, 
      ...parameters.additionalMessageProperties 
    }),
    parameters.propertyValue
  ));
};
