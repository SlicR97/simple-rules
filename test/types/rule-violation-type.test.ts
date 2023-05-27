import { Maybe, RuleViolation } from '../../src'
import { expect } from 'chai'

describe('rule-violation.type.ts', () => {
  describe('#create()', () => {
    it("does not have a field 'additionalProperties' when the parameter 'additionalProperties' is undefined", () => {
      expect(RuleViolation.create(['ERROR'], 'foo')).to.eql({
        errorCodes: ['ERROR'],
        propertyValue: 'foo',
      })
    })

    it("does not have a field 'propertyValue' when the parameter 'propertyValue' is undefined", () => {
      expect(RuleViolation.create(['ERROR'])).to.eql({
        errorCodes: ['ERROR'],
        propertyValue: Maybe.None(),
      })
    })

    it("has a field 'additionalProperties' when the parameter 'additionalProperties' is not undefined", () => {
      expect(RuleViolation.create(['ERROR'], 'foo', { bar: 'baz' })).to.eql({
        errorCodes: ['ERROR'],
        propertyValue: 'foo',
        additionalProperties: {
          bar: 'baz',
        },
      })
    })
  })

  describe('#isRuleViolation()', () => {
    it("returns true for an object with array 'errorCodes' and property 'propertyValues'", () => {
      expect(
        RuleViolation.isRuleViolation({
          errorCodes: ['foo', 'bar'],
          propertyValue: 2,
        }),
      ).to.be.true
    })

    it("returns false for an object with non-array property 'errorCodes' and property 'propertyValues'", () => {
      expect(
        RuleViolation.isRuleViolation({
          errorCodes: 234.43,
          propertyValue: 'foo',
        }),
      ).to.be.false
    })

    it("returns false for an object without property 'errorCodes'", () => {
      expect(
        RuleViolation.isRuleViolation({
          propertyValue: 'foo',
        }),
      ).to.be.false
    })

    it("returns false for an object without property 'propertyValues'", () => {
      expect(
        RuleViolation.isRuleViolation({
          errorCodes: ['foo', 'bar'],
        }),
      ).to.be.false
    })
  })

  describe('#merge()', () => {
    it('merges the error codes of two RuleViolation objects', () => {
      expect(
        RuleViolation.merge(
          {
            errorCodes: ['foo'],
            propertyValue: 1,
          },
          {
            errorCodes: ['bar'],
            propertyValue: 1,
          },
        ),
      ).to.be.eql({
        errorCodes: ['foo', 'bar'],
        propertyValue: 1,
      })
    })

    it("always uses a's propertyValue, even if b's is different", () => {
      expect(
        RuleViolation.merge(
          {
            errorCodes: [],
            propertyValue: 1,
          },
          {
            errorCodes: [],
            propertyValue: 2,
          },
        ),
      ).to.be.eql({
        errorCodes: [],
        propertyValue: 1,
      })
    })

    it('merges the additionalProperties of two RuleViolation objects, if provided', () => {
      expect(
        RuleViolation.merge(
          {
            errorCodes: ['MIN_LENGTH'],
            propertyValue: '',
            additionalProperties: {
              threshold: 3,
            },
          },
          {
            errorCodes: ['NOT_EMPTY'],
            propertyValue: '',
            additionalProperties: {
              foo: 'bar',
            },
          },
        ),
      ).to.eql({
        errorCodes: ['MIN_LENGTH', 'NOT_EMPTY'],
        propertyValue: '',
        additionalProperties: {
          threshold: 3,
          foo: 'bar',
        },
      })
    })
  })
})
