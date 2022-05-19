import { equal } from "assert"
import { Maybe } from "../../src/index"

describe('maybe.type.ts', () => {
  describe('#Some()', () => {
    it('should return the object that was passed to it', () => {
      equal(Maybe.Some('test'), 'test');
    });
  });

  describe('#None()', () => {
    it('should return nothing', () => {
      equal(Maybe.None(), undefined);
    });
  });
});
