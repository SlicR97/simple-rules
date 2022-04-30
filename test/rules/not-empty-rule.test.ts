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
    deepEqual(NotEmpty.validate()('')('x'), { 
      propertyName: 'x',
      errorMessage: 'x must not be empty.',
      attemptedValue: ''
    });
  });

  it('Validate should return undefined when not empty', () => {
    equal(NotEmpty.validate()(' ')('x'), Maybe.None());
  });

  it('Validate with options should return a custom property name', () => {
    deepEqual(NotEmpty.validate({ propertyName: 'y' })('')('x'), {
      propertyName: 'y',
      errorMessage: 'y must not be empty.',
      attemptedValue: ''
    });
  });

  it('Validate with options should return a custom error message', () => {
    deepEqual(NotEmpty.validate({ errorMessage: 'y' })('')('x'), {
      propertyName: 'x',
      errorMessage: 'y',
      attemptedValue: ''
    });
  });

  it('Using {PropertyName} in my custom error message should return a formatted error message', () => {
    deepEqual(NotEmpty.validate({ propertyName: 'test', errorMessage: '{propertyName} should not be empty' })('')('x'), {
      propertyName: 'test',
      errorMessage: 'test should not be empty',
      attemptedValue: ''
    });
  });
});
