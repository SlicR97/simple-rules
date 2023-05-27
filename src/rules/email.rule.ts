import {Maybe} from "../types/maybe.type";
import {RuleViolation} from "../types/rule-violation.type";
import {basicRule} from "./basic.rule";

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
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(x);
    }

    /**
     * Partially applied function.
     *
     * @returns a function that takes a value to validate
     */
    export const validate = () =>
        /**
         * Validation function
         * 
         * @param x Input for validation
         * @returns RuleViolation if the validation fails, or nothing if it succeeds
         */
        (x: string): Maybe<RuleViolation<string>> => {
            return basicRule({
                ruleSatisfied: rule(x),
                errorCode: 'EMAIL',
                propertyValue: x,
            })
        }
}
