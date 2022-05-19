import { deepEqual, equal } from "assert";

import { RuleViolation } from '../../src/types/rule-violation.type';

describe('rule-violation.type.ts', () => {
  describe('#create()', () => {
    it('should not have a field \'additionalProperties\' when the parameter \'additionalProperties\' was undefined', () => {
      deepEqual(RuleViolation.create([ 'ERROR' ], 'foo'), {
        errorCodes: [ 'ERROR' ],
        propertyValue: 'foo'
      });
    });

    it('should have a field \'additionalProperties\' when the parameter \'additionalProperties\' was not undefined', () => {
      deepEqual(RuleViolation.create([ 'ERROR' ], 'foo', { bar: 'baz' }), {
        errorCodes: [ 'ERROR' ],
        propertyValue: 'foo',
        additionalProperties: {
          bar: 'baz'
        }
      });
    });
  });

  describe('#isRuleViolation()', () => {
    it('should return true for an object with array \'errorCodes\' and property \'propertyValues\'', () => {
      equal(RuleViolation.isRuleViolation({
        errorCodes: [ 'foo', 'bar' ],
        propertyValue: 2
      }), true);
    });

    it('should return false for an object with non-array property \'errorCodes\' and property \'propertyValues\'', () => {
      equal(RuleViolation.isRuleViolation({
        errorCodes: 234.43,
        propertyValue: 'foo'
      }), false);
    });

    it('should return false for an object without property \'errorCodes\'', () => {
      equal(RuleViolation.isRuleViolation({
        propertyValue: 'foo'
      }), false);
    });

    it('should return false for an object without property \'propertyValues\'', () => {
      equal(RuleViolation.isRuleViolation({
        errorCodes: [ 'foo', 'bar' ]
      }), false);
    });
  });

  describe('#merge()', () => {
    it('should merge the error codes of two RuleViolation objects', () => {
      deepEqual(RuleViolation.merge({
        errorCodes: [ 'foo' ],
        propertyValue: 1
      }, {
        errorCodes: [ 'bar' ],
        propertyValue: 1
      }), {
        errorCodes: [ 'foo', 'bar' ],
        propertyValue: 1
      });
    });

    it('should always use a\'s propertyValue, even if b\'s is different', () => {
      deepEqual(RuleViolation.merge({
        errorCodes: [],
        propertyValue: 1
      }, {
        errorCodes: [],
        propertyValue: 2
      }), {
        errorCodes: [],
        propertyValue: 1
      });
    });

    it('should merge the additionalProperties of two RuleViolation objects, if provided', () => {
      deepEqual(RuleViolation.merge({
        errorCodes: [ 'MIN_LENGTH' ],
        propertyValue: '',
        additionalProperties: {
          threshold: 3
        }
      }, {
        errorCodes: [ 'NOT_EMPTY' ],
        propertyValue: '',
        additionalProperties: {
          foo: 'bar'
        }
      }), {
        errorCodes: [ 'MIN_LENGTH', 'NOT_EMPTY' ],
        propertyValue: '',
        additionalProperties: {
          threshold: 3,
          foo: 'bar'
        }
      });
    });
  });
});
