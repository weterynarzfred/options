# Options

All options should be objects placed in the `options` object inside `options.js`. Each option on the same level has to have an unique key. Example:
```js
const options = {
  testOption: {
    name: 'Test Option',
    text: <p>This is a test.</p>,
  },
  testOption2: {
    name: 'Another Test Option',
  }
};
```
If using jsx in options like in the example, React has to be in scope:
```js
import React from 'react';
```

# keys that can be set in `options`

## `type`
- type: `string`
- default: `'option'`

Type of the option. Possible values are `'option'`,  `'group'` and `'story'`.

## `name`
- type: `string` | `jsx`
- default: `''`
- usable in: `option`, `group`, `story`

The name that will be displayed.

## `text`
- type: `string` | `jsx` | `(sting|jsx) function`
- default: `''`
- usable in: `option`, `group`, `story`

The text that will be displayed. Parameter passed to the function is an object containing:
```
{
  {object} option - Current option.
  {object} options - Global options.
  {array} error - Global errors.
}
```

## `link`
- type: `string`
- default: _none_
- usable in: `option`, `group`

Path to another option to link to. If target option is inactive the link will be disabled. In the example link will become enabled when option 'A' is selected. Option 'B' does not have to be selected.
```js
const options = {
  a: {
    name: 'A',
    options: {
      a1: {
        name: 'A1',
      },
    },
  },
  b: {
    name: 'B',
    link: 'a/a1',
  }
};
```

## `min`
- type: `number`
- default: 0
- usable in: `option`, `group`

Minimum number of times an options can be selected. Cannot be nagative. If above 0, option will be initially selected.

## `max`
- type: `number` | `(bool) false`
- default: 1
- usable in: `option`, `group`

Analogous to `min`. Setting to `false` removes the restriction.

## `image`
- type: `string`
- default: _none_
- usable in: `option`, `group`

Path to option's image, relative to the `public` folder.

## `cost`
- type: `object`
- default: _none_
- usable in: `option`

Cost of buying an option. Should be an object with a structure:
```
{
  currencySlug: (number | function),
  secondCurrencySlug: (number | function)
}
```
Function will be called in a loop for each time the option was bought. Parameter passed to the function is an object containing:
```
{
  {number} index - Number of current iteration.
  {object} option - Current option.
  {object} options - Global options.
}
```
Example of an option with a cost represented by a function:
```js
{
  name: 'Option',
  text: <p>This options costs one gold more for each time you have bought it.</p>,
  cost: {
    gold: data => data.index + 1,
  },
}
```

## `options`
- type: `object`
- default: _none_
- usable in: `option`, `group`

Object containing suboptions of the current option.

## `test`
- type: `(bool) function`
- default: _none_
- usable in: `option`, `group`

A function that will be executed to decide if the options should be active. Parameter passed to the function is an object containing:
```
{
  {object} option - Current option.
  {object} options - Global options.
}
```

## `optionCurrency`
- type: `object`
- default: _none_
- usable in: `option`, `group`

Object containing currencies to be used in current option's suboptions. Should have a form of:
```
{
  currencySlug: {
    name: (string), // Name of the currency.
    value: (number) // Initial value.
  },
}
```

## `optionsFunction`
- type: `function`
- default: _none_
- usable in: `option`, `group`

## `hasIndividualChildren`
- type: `bool`
- default: `false`
- usable in: `option`

If set to `true` each time the option is bought it will create a new option as a suboption of the bought option. When set, `options` will be ignored.

## `individualOptions`
- type: `object`
- default: _none_
- usable in: `option` when `hasIndividualChildren` is set to `true`

Object containing suboptions that will be copied to each child upon creation.

## `childOptionCurrency`
- type: `object`
- default: _none_
- usable in: `option` when `hasIndividualChildren` is set to `true`

Object containing currencies to be used in current option's children's suboptions.

## `useImageOfSelected`
- type: `bool`
- default: `false`

## `defaultChildName`
- type: `string`
- default: same as `name`

# keys set automaticaly

## `slug`
- type: `string`
- default: _none_

Has the same value as the key used to create the option.

## `path`
- type: `string`
- default: _none_

Stores a string representing the path to the option, with option slugs separated by a `/`. In the example, option 'A' would have a path `'a'` and option 'B' a path `'a/b'`.
```js
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
```

## `selected`
- type: `number` | `object`
- default: `0`

Either a number of times the option was selected or an object containing all of its created children.

## `isChild`
- type: `bool`
- default: `false`

Is set to `true` in options that were created as children of options with `hasIndividualChildren`.

## `isSynthetic`
- type: `bool`
- default: `false`

Is set to `true` in temporary option objects created using `optionsFunction`. Those options are not present in the state.

## `functionalChildren`
- type: `object`
- default: `{}`

Container for temporary option objects created using `optionsFunction`. This object might not have an actual representation of option's suboptions.


# To do
- better documentation
- 'navigate back' button
- 'rename' button
- styling
- `test` in `story`
- display regular suboptions alongside option's children
- links to open suboptions
- selects in suboptions
- links between options
- wide options
- errors menu
- random outcomess
- access to `settings` in option functions
- stages