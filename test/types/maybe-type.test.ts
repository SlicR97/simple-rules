import { Maybe } from '../../src'
import { expect } from 'chai'

describe('maybe.type.ts', () => {
  describe('#Some()', () => {
    it('returns the object that was passed to it', () => {
      expect(Maybe.Some('test')).to.eq('test')
    })
  })

  describe('#None()', () => {
    it('returns nothing', () => {
      expect(Maybe.None()).to.be.undefined
    })
  })
})
