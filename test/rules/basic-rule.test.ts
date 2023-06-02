import { basicRule } from '../../src'
import { expect } from 'chai'

describe('basic.rule.ts', () => {
  describe('#basicRule()', () => {
    it('Should return undefined if the condition is satisfied', () => {
      expect(basicRule(true, 'ignored', 'ignored')).to.be.undefined
    })

    it('Should return an error object if the condition is not satisfied', () => {
      expect(basicRule(false, 'ERROR', 'foo')).to.eql({
        errorCodes: ['ERROR'],
        propertyValue: 'foo',
      })
    })
  })
})
