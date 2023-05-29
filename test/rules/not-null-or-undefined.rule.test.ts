import { expect } from 'chai'
import { NotNullOrUndefined } from '../../src'

describe('not-null-or-undefined.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false on null', () => {
      expect(NotNullOrUndefined.rule(null)).to.be.false
    })

    it('returns false on undefined', () => {
      expect(NotNullOrUndefined.rule(undefined)).to.be.false
    })

    it('returns true on a string', () => {
      expect(NotNullOrUndefined.rule('')).to.be.true
    })

    it('returns true on an array', () => {
      expect(NotNullOrUndefined.rule([])).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is null', () => {
      expect(NotNullOrUndefined.validate(null)).to.eql({
        errorCodes: ['NOT_NULL_OR_UNDEFINED'],
        propertyValue: null,
      })
    })

    it('returns an error object when the input is undefined', () => {
      expect(NotNullOrUndefined.validate(undefined)).to.eql({
        errorCodes: ['NOT_NULL_OR_UNDEFINED'],
        propertyValue: undefined,
      })
    })

    it('returns nothing when the input is not null or undefined', () => {
      expect(NotNullOrUndefined.validate('')).to.be.undefined
    })
  })
})
