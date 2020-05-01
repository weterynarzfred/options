import { isObject } from "../functions/helpers";

test('recognizes objects', () => {
  expect(isObject(null)).toBe(false);
  expect(isObject(a => a)).toBe(true);
  expect(isObject({})).toBe(true);
  expect(isObject()).toBe(false);
});