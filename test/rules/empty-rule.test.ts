import { Empty } from '../../src'
import { expect } from 'chai'

describe('empty.rule.ts', () => {
  describe('#rule()', () => {
    it('returns true on an empty string', () => {
      expect(Empty.rule('')).to.be.true
    })

    it('returns true on an empty array', () => {
      expect(Empty.rule([])).to.be.true
    })

    it('returns false on a non-empty string', () => {
      expect(Empty.rule(' ')).to.be.false
    })

    it('returns false on a non-empty array', () => {
      expect(Empty.rule([1])).to.be.false
    })
  })

  describe('#validate()', () => {
    it('returns an error object when the input is not empty', () => {
      expect(Empty.validate(' ')).to.eql({
        errorCodes: ['EMPTY'],
        propertyValue: ' ',
      })
    })

    it('returns nothing when the input is empty', () => {
      expect(Empty.validate('')).to.eql(undefined)
    })
  })
})
