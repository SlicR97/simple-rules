import { Maybe } from '../types/maybe.type'
import { RuleViolation } from '../types/rule-violation.type'
import { basicRule } from './basic.rule'

/**
 * Validation for a string to
 * correspond to an email address
 */
export namespace Email {
  /**
   * Matches a string against an email regex
   * @param x the string to validate
   * @returns true if the string matches the regex
   */
  export const rule = (x: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(x)
  }

  /**
   * Validation function
   *
   * @param x Input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = (x: string): Maybe<RuleViolation<string>> =>
    basicRule(rule(x), 'EMAIL', x)
}
