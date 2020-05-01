import { getParent } from "../functions/helpers";
import prepareOptions from './../reducer/prepareOptions';

test('finds a parent to an option', () => {
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
  expect(getParent(options.a, options)).toBe(false);
});