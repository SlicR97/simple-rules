import { expect } from 'chai'
import { Undefined } from '../../src'

describe('undefined.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on undefined', () => {
      expect(Undefined.rule(undefined)).to.be.true
    })

    it('returns false on a string', () => {
      expect(Undefined.rule('')).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is not undefined', () => {
      expect(Undefined.validate('')).to.eql({
        errorCodes: ['UNDEFINED'],
        propertyValue: '',
      })
    })

    it('returns nothing when the input is undefined', () => {
      expect(Undefined.validate(undefined)).to.be.undefined
    })
  })
})
