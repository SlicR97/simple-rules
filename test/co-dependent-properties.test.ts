import { deepEqual } from "assert";
import { rules } from "../src/rules";

type TestType = {
  foo: string;
  bar: string;
};

describe('Codependent rules test suite', () => {
  it('Codependent rules with a valid object do not return errors', () => {
    deepEqual(rules<TestType>(
      ['foo', (foo: string, t: TestType) => foo !== t.bar, 'FOO_EQ_BAR']
    )({
      foo: 'test',
      bar: 'test'
    }), {});
  });

  it('Codependent rules with an invalid object return errors', () => {
    deepEqual(rules<TestType>(
      ['foo', (foo: string, t: TestType) => foo !== t.bar, 'FOO_EQ_BAR']
    )({
      foo: 'test',
      bar: 'baz'
    }), {
      foo: {
        errorCodes: [ 'FOO_EQ_BAR' ],
        propertyValue: 'test'
      }
    })
  })
});
