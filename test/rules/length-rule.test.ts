import { expect } from 'chai'
import { Length } from '../../src'

describe('length.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false when the input is an array and its length is different from the target length', () => {
      expect(Length.rule([1, 2, 3], 2)).to.be.false
    })

    it('returns true when the input is an array and its length is equal to the target length', () => {
      expect(Length.rule([1, 2, 3], 3)).to.be.true
    })

    it('returns false when the input is a string and its length is different from the target length', () => {
      expect(Length.rule('foo', 2)).to.be.false
    })

    it('returns true when the input is a string and its length is equal to the target length', () => {
      expect(Length.rule('foo', 3)).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is an array and its length is different from the target length', () => {
      expect(Length.validate({ length: 2 })([1, 2, 3])).to.eql({
        errorCodes: ['LENGTH'],
        propertyValue: [1, 2, 3],
      })
    })

    it('returns an error object when the input is a string and its length is different from the target length', () => {
      expect(Length.validate({ length: 2 })('foo')).to.eql({
        errorCodes: ['LENGTH'],
        propertyValue: 'foo',
      })
    })

    it('returns nothing when the input is an array and its length is equal to the target length', () => {
      expect(Length.validate({ length: 3 })([1, 2, 3])).to.be.undefined
    })

    it('returns nothing when the input is a string and its length is equal to the target length', () => {
      expect(Length.validate({ length: 3 })('foo')).to.be.undefined
    })
  })
})
