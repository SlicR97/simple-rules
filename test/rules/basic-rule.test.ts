import { deepEqual, equal } from "assert"

import { basicRule } from '../../src/rules/basic.rule';

describe('basic.rule.ts', () => {
  describe('#basicRule()', () => {
    it('Should return undefined if the condition is satisfied', () => {
      equal(basicRule({
        ruleSatisfied: true,
        errorCode: 'ignored',
        propertyValue: 'ignored'
      }), undefined);
    });

    it('Should return an error object if the condition is not satisfied', () => {
      deepEqual(basicRule({
        ruleSatisfied: false,
        errorCode: 'ERROR',
        propertyValue: 'foo'
      }), {
        errorCodes: [ 'ERROR' ],
        propertyValue: 'foo'
      });
    });
  });
});
