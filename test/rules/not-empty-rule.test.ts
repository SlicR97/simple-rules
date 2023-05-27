import { NotEmpty, Maybe } from '../../src'
import { expect } from 'chai'

describe('not-empty.rule.ts', () => {
  describe('#rule()', () => {
    it('should return false on an empty string', () => {
      expect(NotEmpty.rule('')).to.be.false
    })

    it('should return false on an empty array', () => {
      expect(NotEmpty.rule([])).to.be.false
    })

    it('should return true on a non-empty string', () => {
      expect(NotEmpty.rule(' ')).to.be.true
    })

    it('should return true on a non-empty array', () => {
      expect(NotEmpty.rule([1])).to.be.true
    })
  })

  describe('#validate()', () => {
    it('should return an error object when the input is empty', () => {
      expect(NotEmpty.validate('')).to.eql({
        errorCodes: ['NOT_EMPTY'],
        propertyValue: '',
      })
    })

    it('should return nothing when the input is not empty', () => {
      expect(NotEmpty.validate(' ')).to.eql(Maybe.None())
    })
  })
})
