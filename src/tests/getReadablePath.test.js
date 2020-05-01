import { getReadablePath } from "../functions/helpers";

test('creates a readable path', () => {
  const options = {
    a: {
      name: 'A',
      options: {
        b: {
          name: 'B',
        },
      },
    },
  };

  expect(getReadablePath('a/b', options)).toBe('A / B');
});