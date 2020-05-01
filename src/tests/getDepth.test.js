import getDepth from './../functions/getDepth';
import prepareOptions from './../reducer/prepareOptions';

test('finds how many layers of suboption an option has', () => {
  const options = prepareOptions({
    a: {
      name: 'A',
      type: 'group',
      options: {
        b: {
          name: 'B',
          type: 'group',
          options: {
            c: {
              name: 'C',
              type: 'group',
              options: {
                d: {
                  name: 'D',
                },
              },
            },
          },
        },
      },
    },
    e: {
      name: 'E',
      options: {
        f: {
          name: 'F',
        },
      },
    },
  });

  expect(getDepth(options.a.options.b, options)).toBe(3);
  expect(getDepth(options.a, options)).toBe(4);
  expect(getDepth(options.e, options)).toBe(1);
});