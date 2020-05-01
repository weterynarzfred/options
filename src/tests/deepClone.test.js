import React from 'react';
import { deepClone } from "../functions/helpers";

test('deep clones an object', () => {
  const object = {
    a: ['a', 'b', 'c'],
    b: b => b,
    c: <p>test</p>,
  };
  const clone = deepClone(object);
  expect(clone).toEqual(object);
  expect(clone).not.toBe(object);
});