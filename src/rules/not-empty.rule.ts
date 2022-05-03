import { Maybe } from "../types/maybe.type";
import { RuleOptions } from "../types/rule-options.type";
import { RuleViolation } from "../types/rule-violation.type";
import { formatError } from "../util/format-error";

export namespace NotEmpty {
  export const rule = (x: string | any[]): boolean => {
    return x.length !== 0;
  };

  export const errorMessage = "{propertyName} must not be empty.";

  export const validate = (options?: RuleOptions) => (x: string | any[], propertyName: string) : Maybe<RuleViolation> => {
    if (rule(x)) return Maybe.None();
    else {
      const _propertyName = options?.propertyName ?? propertyName;
      const _errorMessage = options?.errorMessage ?? errorMessage;
      return Maybe.Some(RuleViolation.create(
        _propertyName,
        formatError(_errorMessage, { propertyName: _propertyName, propertyValue: x }),
        x
      ));
    }
  }
}
