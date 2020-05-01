import { getParent } from "../functions/helpers";
import prepareOptions from './../reducer/prepareOptions';

test('creates a readable path', () => {
  const options = prepareOptions({
    a: {
      name: 'A',
      options: {
        b: {
          name: 'B',
        },
      },
    },
  });

  expect(getParent(options.a.options.b, options)).toBe(options.a);
});