import { Maybe, RuleViolation } from '../index'

/**
 * Provides a wrapper that easily evaluates a basic rule
 *
 * @param ruleSatisfied Flag indicating if the rule has been satisfied
 * @param errorCode Error code for the RuleViolation
 * @param propertyValue Value of the validated property
 * @param additionalProperties Any additional parameters regarding execution of the rule
 *
 * @returns Either a RuleViolation, if the rule was not satisfied, or nothing if not
 */
export const basicRule = <TProperty>(
  ruleSatisfied: boolean,
  errorCode: string,
  propertyValue: TProperty,
  additionalProperties?: Maybe<Record<string, unknown>>,
): Maybe<RuleViolation<TProperty>> => {
  if (ruleSatisfied) return undefined

  return RuleViolation.create<TProperty>(
    [errorCode],
    propertyValue,
    additionalProperties,
  )
}
