import { deepEqual } from "assert";
import { rules } from "../src/rules";

type TestType = {
  foo: string;
  bar: string;
};

describe('Codependent rules test suite', () => {
  it('Codependent rules with a valid object do not return errors', () => {
    deepEqual(rules<TestType>(
      ['foo', (foo: string, t: TestType) => foo !== t.bar, 'foo must be equal to bar']
    )({
      foo: 'test',
      bar: 'test'
    }), {});
  });

  it('Codependent rules with an invalid object return errors', () => {
    deepEqual(rules<TestType>(
      ['foo', (foo: string, t: TestType) => foo !== t.bar, 'foo must be equal to bar']
    )({
      foo: 'test',
      bar: 'baz'
    }), {
      foo: [
        {
          errorMessage: 'foo must be equal to bar',
          propertyValue: 'test'
        }
      ]
    })
  })
});
