import buyOption from './../reducer/buyOption';
import prepareOptions from './../reducer/prepareOptions';
import { clone } from './../functions/helpers';
import recalculateState from './../reducer/recalculateState';
import getOption from '../functions/getOption';

test('buys an option', () => {
  const options = prepareOptions({
    option: {
      name: 'Option',
      max: 2,
    },
    a: {
      name: 'A',
      type: 'group',
      options: {
        b: {
          name: 'B',
          selected: 1,
        },
        c: {
          name: 'B',
        },
      },
    },
    b: {
      name: 'B',
      options: data => ({
        c: {
          name: 'C',
          max: 2,
        },
      }),
    },
  });
  recalculateState({ options, settings: {}, path: [] });

  const opts1 = clone(options);
  buyOption(options.a, opts1);
  expect(opts1).toEqual(options);

  const opts2 = clone(options);
  buyOption(options.option, opts2);
  expect(opts2.option.selected).toBe(1);

  const opts3 = clone(options);
  buyOption(options.a.options.c, opts3);
  expect(opts3.a.options.c.selected).toBe(1);
  expect(opts3.a.options.b.selected).toBe(0);

  const opts4 = clone(options);
  buyOption(getOption('b/c', opts4), opts4);
  expect(getOption('b/c', opts4).selected).toBe(1);
  buyOption(getOption('b/c', opts4), opts4);
  expect(getOption('b/c', opts4).selected).toBe(2);
  buyOption(getOption('b/c', opts4), opts4);
  expect(getOption('b/c', opts4).selected).toBe(2);
});