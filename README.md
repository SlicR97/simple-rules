# simple-rules
Simple input validation

## Installation
Using npm:
```
npm install simple-rules
```

Using yarn:
```
yarn add simple-rules
```

## Usage Example
To give you an example of how this library works, look at the following code snippet:
```typescript
import { rules, Rules } from 'simple-rules';

type RegistrationInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const registrationInputRules = rules<RegistrationInput>(
  ['email', Rules.notEmpty],
  ['password', Rules.notEmpty],
  ['password', Rules.minLength({ threshold: 8 })],
  ['password', (password, input) => password === input.passwordConfirmation, 'PASSWORDS_DONT_MATCH'],
  ['passwordConfirmation', Rules.notEmpty],
  ['passwordConfirmation', Rules.minLength({ threshold: 8 })]
);

const input: RegistrationInput = {
  email: 'test@abc.com',
  password: 'superSecretPassword',
  passwordConfirmation: 'anotherSecretPassword'
};

const ruleViolations = registrationInputRules(input);

/**
 * RuleViolations:
 * {
 *   password: {
 *     errorCodes: [ 'PASSWORDS_DONT_MATCH' ],
 *     propertyValue: 'superSecretPassword'
 *   }
 * }
 */
```

As we see, there are 4 steps to perform a validation with `simple-rules`:
1. Define the type that should be validated
2. Define your validations by using the `rules` function and passing it the tuples / triples you need for the validation
3. Get an actual input object (this could for example be the body of a POST request)
4. Apply the input object to your validation function and evaluate the results

## Types of rules
As for now, there are three different types of rules you can use to validate your objects:

### Normal rules
Normal rules are the simplest ones. They simply take the property you want to validate and return a `RuleViolation` if the validation fails or `undefined` if it succeeds. This library provides many predefined normal rules out of the box.

### Nested rules
Nested rules are used when the validated property is in itself a complex object. That way, you can validate objects that are nested as deeply as you need them to be.

### Codependent rules
Codependent rules are used when the validity of a property depends on the state of another. For example, in the code snippet above, we needed to check if the two passwords entered by the user actually match.

### Combining the rule types
As a general rule of thumb, you should always be able to apply as many rules as needed to a given property. The same goes for codependent rules. Nested rules are the exception here, because you cannot apply nested rules to a property that is being validated with normal or codependent rules, nor can you apply two sets of nested rules to the same property.

### Further information
For further information, I have to direct you to the unit tests for now. I will continue this documentation once I find the time necessary to do so. You can also check out this repository and play around with the code in the `sample` directory.
