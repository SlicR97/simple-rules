import { NotEmpty, Maybe } from '../../src'
import { expect } from 'chai'

describe('not-empty.rule.ts', () => {
  describe('#rule()', () => {
    it('returns false on an empty string', () => {
      expect(NotEmpty.rule('')).to.be.false
    })

    it('returns false on an empty array', () => {
      expect(NotEmpty.rule([])).to.be.false
    })

    it('returns true on a non-empty string', () => {
      expect(NotEmpty.rule(' ')).to.be.true
    })

    it('returns true on a non-empty array', () => {
      expect(NotEmpty.rule([1])).to.be.true
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is empty', () => {
      expect(NotEmpty.validate('')).to.eql({
        errorCodes: ['NOT_EMPTY'],
        propertyValue: '',
      })
    })

    it('returns nothing when the input is not empty', () => {
      expect(NotEmpty.validate(' ')).to.eql(Maybe.None())
    })
  })
})
