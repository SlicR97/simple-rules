import { MaxLength } from '../../src'
import { expect } from 'chai'

describe('max-length.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false on a string that is longer than its threshold', () => {
      expect(MaxLength.rule('test', 2)).to.be.false
    })

    it('returns true on a string that is as long as its threshold', () => {
      expect(MaxLength.rule('test', 4)).to.be.true
    })

    it('returns true on a string that is shorter than its threshold', () => {
      expect(MaxLength.rule('test', 6)).to.be.true
    })

    it('returns false on an array that is longer than its threshold', () => {
      expect(MaxLength.rule([1, 2, 3, 4], 2)).to.be.false
    })

    it('returns true on an array that is as long as its threshold', () => {
      expect(MaxLength.rule([1, 2, 3, 4], 4)).to.be.true
    })

    it('returns true on an array that is shorter than its threshold', () => {
      expect(MaxLength.rule([1, 2, 3, 4], 6)).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object if the input is too long', () => {
      expect(MaxLength.validate({ threshold: 2 })('test')).to.eql({
        errorCodes: ['MAX_LENGTH'],
        propertyValue: 'test',
        additionalProperties: {
          threshold: 2,
        },
      })
    })

    it('does not return anything if the input object is short enough', () => {
      expect(MaxLength.validate({ threshold: 6 })('test')).to.be.undefined
    })
  })
})
