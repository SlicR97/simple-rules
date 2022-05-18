import { deepEqual, equal } from 'assert';
import { NotEmpty } from '../../src/rules/not-empty.rule';
import { Maybe } from '../../src/types/maybe.type';

describe('NotEmpty test suite', () => {
  it('Rule should return false on an empty string', () => {
    equal(NotEmpty.rule(''), false);
  });

  it('Rule should return false on an empty array', () => {
    equal(NotEmpty.rule([]), false);
  });

  it('Rule should return true on a non-empty string', () => {
    equal(NotEmpty.rule(' '), true);
  });

  it('Rule should return true on a non-empty array', () => {
    equal(NotEmpty.rule([1]), true);
  });

  it('ErrorMessage should return specific string', () => {
    equal(NotEmpty.errorMessage, '{propertyName} must not be empty.');
  });

  it('Validate should return object when empty', () => {
    deepEqual(NotEmpty.validate(''), {
      errorCodes: [ 'NOT_EMPTY' ],
      propertyValue: ''
    });
  });

  it('Validate should return undefined when not empty', () => {
    equal(NotEmpty.validate(' '), Maybe.None());
  });
});
