import { expect } from 'chai'
import { NotUndefined } from '../../src'

describe('not-undefined.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false on undefined', () => {
      expect(NotUndefined.rule(undefined)).to.be.false
    })

    it('returns true on a string', () => {
      expect(NotUndefined.rule('')).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is undefined', () => {
      expect(NotUndefined.validate(undefined)).to.eql({
        errorCodes: ['NOT_UNDEFINED'],
        propertyValue: undefined,
      })
    })

    it('returns nothing when the input is not undefined', () => {
      expect(NotUndefined.validate('')).to.be.undefined
    })
  })
})
