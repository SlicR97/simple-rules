import { Maybe } from "./types/maybe.type";
import { RuleViolation, RuleViolations } from "./types/rule-violation.type";

export type RuleFunction<T, TU extends keyof T> = (x: T[TU], propertyName: TU) => Maybe<RuleViolation>;
export type Rule<T, TU extends keyof T> = [TU, ...(RuleFunction<T, TU>)[]];

export const rules = <T>(...rules: Rule<T, keyof T>[]) => (t: T) => rules.reduce((errors, rule) => {
    const [key, ...fns] = rule;
    const fieldErrors = fns
        .map(fn => fn(t[key], key))
        .filter(x => x !== undefined);
    return [...errors, ...fieldErrors as RuleViolations];
}, [] as RuleViolations);
