import { Maybe } from '../types/maybe.type'
import { RuleViolation } from '../types/rule-violation.type'
import { basicRule } from './basic.rule'
import luhnCheck from '../internal/functions/luhn-check.function'

/**
 * Validation for a string to
 * represent a credit card number
 */
export namespace CreditCard {
  /**
   * Check if a string is a valid credit card number
   * @param x the string to validate
   * @returns true if the string represents a valid credit card number
   */
  export const rule = (x: string): boolean => {
    const normalizedString = x.replace(/[- ]/g, '')
    return luhnCheck(normalizedString)
  }

  /**
   * Validation function
   *
   * @param x Input for validation
   * @returns RuleViolation if the validation fails, or nothing if it succeeds
   */
  export const validate = (x: string): Maybe<RuleViolation<string>> =>
    basicRule(rule(x), 'CREDIT_CARD', x)
}
