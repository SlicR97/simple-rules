import { MinLength } from '../../src'
import { expect } from 'chai'

describe('min-length.rule.ts', () => {
  describe('#rule()', () => {
    it('should return false on a string that is less long than its threshold', () => {
      expect(MinLength.rule('test', 6)).to.be.false
    })

    it('should return true on a string that is as long as its threshold', () => {
      expect(MinLength.rule('test', 4)).to.be.true
    })

    it('should return true on a string that is longer than its threshold', () => {
      expect(MinLength.rule('test', 2)).to.be.true
    })

    it('should return false on an array that is less long than its threshold', () => {
      expect(MinLength.rule([1, 2, 3, 4], 6)).to.be.false
    })

    it('should return true on an array that is as long as its threshold', () => {
      expect(MinLength.rule([1, 2, 3, 4], 4)).to.be.true
    })

    it('should return true on an array that is longer than its threshold', () => {
      expect(MinLength.rule([1, 2, 3, 4], 2)).to.be.true
    })
  })

  describe('#validate()', () => {
    it('should return an error object if the input is too short', () => {
      expect(MinLength.validate({ threshold: 6 })('test')).to.eql({
        errorCodes: ['MIN_LENGTH'],
        propertyValue: 'test',
        additionalProperties: {
          threshold: 6,
        },
      })
    })

    it('should not return anything if the input object is long enough', () => {
      expect(MinLength.validate({ threshold: 3 })('test')).to.be.undefined
    })
  })
})
