import { Maybe } from "../types/maybe.type";
import { RuleOptions } from "../types/rule-options.type";
import { RuleViolation } from "../types/rule-violation.type";
import { formatError } from "../util/format-error";

export namespace MinLength {
  type MinLengthOptions = RuleOptions & {
    threshold: number;
  }

  export const rule = (x: string | any[], threshold: number): boolean => {
    return x.length >= threshold;
  };

  export const errorMessage = "{propertyName}'s length must be at least {minLength}.";

  export const validate = (options: MinLengthOptions) => (x: string | any[]) => (propertyName: string) : Maybe<RuleViolation> => {
    if (rule(x, options.threshold)) return Maybe.None();
    else {
      const _propertyName = options?.propertyName ?? propertyName;
      const _errorMessage = options?.errorMessage ?? errorMessage;
      return Maybe.Some(RuleViolation.create(
        _propertyName,
        formatError(_errorMessage, { propertyName: _propertyName, propertyValue: x, minLength: options.threshold }),
        x
      ));
    }
  }
}
