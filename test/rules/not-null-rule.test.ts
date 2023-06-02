import { expect } from 'chai'
import { NotNull } from '../../src'

describe('not-null.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false on null', () => {
      expect(NotNull.rule(null)).to.be.false
    })

    it('returns true on a string', () => {
      expect(NotNull.rule('')).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is null', () => {
      expect(NotNull.validate(null)).to.eql({
        errorCodes: ['NOT_NULL'],
        propertyValue: null,
      })
    })

    it('returns nothing when the input is not null', () => {
      expect(NotNull.validate('')).to.be.undefined
    })
  })
})
