import { Maybe } from '../types/maybe.type'
import { RuleViolation } from '../types/rule-violation.type'
import { basicRule } from './basic.rule'

/**
 * Validation for a string to
 * represent a credit card number
 */
export namespace CreditCard {
  /**
   * Luhn algorithm for checking the validity of a credit card number
   * Code taken from https://stackoverflow.com/a/23222562
   *
   * @param val the normalized credit card number (only digits, no spaces or dashes)
   */
  const luhnCheck = (val: string) => {
    let sum = 0
    for (let i = 0; i < val.length; i++) {
      let intVal = parseInt(val[i]!)
      if (isNaN(intVal)) {
        return false
      }

      if (i % 2 == 0) {
        intVal *= 2

        if (intVal > 9) {
          intVal = 1 + (intVal % 10)
        }
      }

      sum += intVal
    }

    return sum % 10 === 0
  }

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
   * Partially applied function.
   *
   * @returns a function that takes a value to validate
   */
  export const validate =
    () =>
    /**
     * Validation function
     *
     * @param x Input for validation
     * @returns RuleViolation if the validation fails, or nothing if it succeeds
     */
    (x: string): Maybe<RuleViolation<string>> => {
      return basicRule({
        ruleSatisfied: rule(x),
        errorCode: 'CREDIT_CARD',
        propertyValue: x,
      })
    }
}
