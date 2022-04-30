import { equal } from 'assert';
import { NotEmpty } from '../../src/validators/not-empty.validator';

describe('NotEmpty test suite', () => {
  it('Validator should return false on an empty string', () => {
    equal(NotEmpty.validator(''), false);
  });

  it('Validator should return false on an empty array', () => {
    equal(NotEmpty.validator([]), false);
  });

  it('Validator should return true on a non-empty string', () => {
    equal(NotEmpty.validator(' '), true);
  });

  it('Validator should return true on a non-empty array', () => {
    equal(NotEmpty.validator([1]), true);
  });

  it('ErrorMessage should return specific string', () => {
    equal('String or array must not be empty.', NotEmpty.errorMessage);
  });
});
