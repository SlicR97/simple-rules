import { rules, Rules } from '../src/index';

type RegistrationInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const registrationInputRules = rules<RegistrationInput>(
  ['email', Rules.notEmpty],
  ['password', Rules.notEmpty],
  ['password', Rules.minLength({ threshold: 8 })],
  ['password', (password, input) => password !== input.passwordConfirmation, 'PASSWORDS_DONT_MATCH'],
  ['passwordConfirmation', Rules.notEmpty],
  ['passwordConfirmation', Rules.minLength({ threshold: 8 })]
);

const input: RegistrationInput = {
  email: 'test@abc.com',
  password: 'superSecretPassword',
  passwordConfirmation: 'anotherSecretPassword'
};

const ruleViolations = registrationInputRules(input);

console.log(ruleViolations);
