import { equal } from 'assert';
import { formatError } from '../../src/util/format-error';

describe('formatError test suite', () => {
  it('FormatError with a string and an empty object returns that same string', () => {
    equal(formatError('test', {}), 'test');
  });

  it('FormatError with a string and a propertyName replaces that propertyName', () => {
    equal(
      formatError('{propertyName} should not be empty', { propertyName: 'test' }),
      'test should not be empty'
    );
  });

  it('FormatError with a string and multiple parameters replaces all occurrences', () => {
    equal(
      formatError('{a} {b}', { a: 'foo', b: 'bar' }),
      'foo bar'
    );
  });

  it('formatError with a parameter and a string that does not mention the parameter returns the same string', () => {
    equal(
      formatError('test', { a: 'foo' }),
      'test'
    );
  });

  it('formatError with a string and a parameter that is not a string returns the formatted string', () => {
    equal(
      formatError('{a}', { a: 200 }),
      '200'
    );
  });

  it('formatError with a string and a parameter that is an object returns incorrectly formatted string', () => {
    equal(
      formatError('{a}', { a: { b: 'foo' } }),
      '[object Object]'
    );
  });
});
