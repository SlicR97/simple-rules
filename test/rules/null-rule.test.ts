import { expect } from 'chai'
import { Null } from '../../src'

describe('null.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on null', () => {
      expect(Null.rule(null)).to.be.true
    })

    it('returns false on a string', () => {
      expect(Null.rule('')).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is not null', () => {
      expect(Null.validate('')).to.eql({
        errorCodes: ['NULL'],
        propertyValue: '',
      })
    })

    it('returns nothing when the input is null', () => {
      expect(Null.validate(null)).to.be.undefined
    })
  })
})
