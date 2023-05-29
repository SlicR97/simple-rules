import { expect } from 'chai'
import { NullOrUndefined } from '../../src'

describe('null-or-undefined.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on null', () => {
      expect(NullOrUndefined.rule(null)).to.be.true
    })

    it('returns true on undefined', () => {
      expect(NullOrUndefined.rule(undefined)).to.be.true
    })

    it('returns false on a string', () => {
      expect(NullOrUndefined.rule('')).to.be.false
    })

    it('returns false on an array', () => {
      expect(NullOrUndefined.rule([])).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns nothing when the input is null', () => {
      expect(NullOrUndefined.validate(null)).to.be.undefined
    })

    it('returns nothing when the input is undefined', () => {
      expect(NullOrUndefined.validate(undefined)).to.be.undefined
    })

    it('returns an error object when the input is not null or undefined', () => {
      expect(NullOrUndefined.validate('')).to.eql({
        errorCodes: ['NULL_OR_UNDEFINED'],
        propertyValue: '',
      })
    })
  })
})
