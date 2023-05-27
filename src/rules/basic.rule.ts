import { Maybe, RuleViolation } from '../index'

/**
 * Input parameters for easily evaluating a basic rule and returning a RuleViolation if its violated
 *
 * @param ruleSatisfied Flag indicating if the rule has been satisfied
 * @param errorCode Error code for the RuleViolation
 * @param propertyValue Value of the validated property
 * @param additionalProperties Any additional parameters regarding execution of the rule
 */
type BasicRuleParameters<TProperty> = {
  ruleSatisfied: boolean
  errorCode: string
  propertyValue: TProperty
  additionalProperties?: Maybe<Record<string, unknown>>
}

/**
 * Provides a wrapper that easily evaluates a basic rule
 *
 * @param BasicRuleParameters Parameters for evaluating the rule
 * @returns Either a RuleViolation, if the rule was not satisfied, or nothing if not
 */
export const basicRule = <TProperty>({
  ruleSatisfied,
  errorCode,
  propertyValue,
  additionalProperties = undefined,
}: BasicRuleParameters<TProperty>): Maybe<RuleViolation<TProperty>> => {
  if (ruleSatisfied) return Maybe.None()

  return Maybe.Some(
    RuleViolation.create<TProperty>(
      [errorCode],
      propertyValue,
      additionalProperties,
    ),
  )
}
