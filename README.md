# Intro
This is an unfinished react/redux boilerplate for making interactive CYOAs. [Current version preview.](https://weterynarzfred.github.io/options/) There are no plans for an editor. Creating your own version requires requires knowing JavaScript and understanding my terribly documented option parameters.

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

## keys that can be set in `options`

### `type`
- type: `string`
- default: `'option'`

Type of the option. Possible values are `'option'`,  `'group'` and `'story'`.

### `name`
- type: `string` | `jsx`
- default: `''`
- usable in: `option`, `group`, `story`

The name that will be displayed.

### `text`
- type: `string` | `jsx` | `(sting|jsx) function`
- default: `''`
- usable in: `option`, `group`, `story`

The text that will be displayed. Parameter passed to the function is an object containing:
```
{
  {object} option - Current option.
  {object} options - Global options.
  {object} settings - Global settings.
  {array} errors - Global errors.
}
```

### `link`
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

### `min`
- type: `number`
- default: 0
- usable in: `option`, `group`

Minimum number of times an options can be selected. Cannot be nagative. If above 0, option will be initially selected.

### `max`
- type: `number` | `(bool) false`
- default: 1
- usable in: `option`, `group`

Analogous to `min`. Setting to `false` removes the restriction.

### `image`
- type: `string`
- default: _none_
- usable in: `option`, `group`

Path to option's image, relative to the `public` folder.

### `imageCy`
- type: `number`
- default: 50
- usable in: `option`, `group`
- 
### `imageCx`
- type: `number`
- default: 50
- usable in: `option`, `group`

### `cost`
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
  {object} settings - Global settings.
  {array} errors - Global errors.
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

### `options`
- type: `object` | `(object) function
- default: _none_
- usable in: `option`, `group`

Object containing suboptions of the current option. If usead as a function will receive an object containing:
```
{
  {object} option - Current option.
  {object} options - Global options.
  {object} settings - Global settings.
  {array} errors - Global errors.
}
```

### `disableOpenButton`
- type: `bool`
- default: false
- usable in: `option`, `group`

### `test`
- type: `(bool) function`
- default: _none_
- usable in: `option`, `group`

A function that will be executed to decide if the options should be active. Parameter passed to the function is an object containing:
```
{
  {object} option - Current option.
  {object} options - Global options.
  {object} settings - Global settings.
  {array} errors - Global errors.
}
```

### `showAsSuboption`
- type: `bool`
- default: false
- usable in: `option`, `group`

### `showWhenDisabled`
- type: `bool`
- default: false
- usable in: `option`, `group` when `test` is set

### `disabledText`
- type: `string` | `jsx`
- default: ''
- usable in: `option`, `group` when `showWhenDisabled` is `true`

### `optionCurrency`
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

### `hasIndividualChildren`
- type: `bool`
- default: `false`
- usable in: `option`

If set to `true` each time the option is bought it will create a new option as a suboption of the bought option. When set, `options` will be ignored.

### `individualOptions`
- type: `object`
- default: _none_
- usable in: `option` when `hasIndividualChildren` is set to `true`

Object containing suboptions that will be copied to each child upon creation.

### `childOptionCurrency`
- type: `object`
- default: _none_
- usable in: `option` when `hasIndividualChildren` is set to `true`

Object containing currencies to be used in current option's children's suboptions.

### `defaultChildName`
- type: `string`
- default: same as `name`
- usable in: `option` when `hasIndividualChildren` is set to `true`

### `dontUseImageOfSelected`
- type: `bool`
- default: `false`

### `disableUseAsSelect`
- type: `bool`
- default: `false`
- usable in: `option`, `group`

## keys set automaticaly

### `slug`
- type: `string`
- default: _none_

Has the same value as the key used to create the option.

### `path`
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

### `selected`
- type: `number` | `object`
- default: `0`

Either a number of times the option was selected or an object containing all of its created children.

### `isChild`
- type: `bool`
- default: `false`

Is set to `true` in options that were created as children of options with `hasIndividualChildren`.

### `isSynthetic`
- type: `bool`
- default: `false`

Is set to `true` in temporary option objects created when `options` is a function. Those options are not present in the state.

### `functionalChildren`
- type: `object`
- default: `{}`

Container for temporary option objects created when `options` is a function. This object might not have an actual representation of option's suboptions.

### `info`
- type: `object`
- default: `{}`


# control types

## add child
- `option.hasIndividualChildren`
- *always true* `option.type === 'option'`

## checkbox
- `option.type === 'option'`
- `option.max === 1`

## spinbox
- `option.type === 'option'`
- `option.max > 1 || option.max === false`

## delete
- `option.isChild`
- *always true* `option.type === 'group'`

## select
- `option.type === 'group'`
- `option.max === 1`
- has more than one suboption with `max === 1 && min === 0`

# Using stages
- add `usesStages: true` to `settings`
- add `currentStage: {stageSlug}` to `settings`
- to omit having to insert stage name in default stage change default `prepend` to `{stageSlug/}` in `_is`, `_isnt` and `_val`
- same with images: add `.replace(/{stageSlug}_/, '')` to `imageName` in `prepareOptions()`

To add a link to a stage:
```js
optionSlug: {
  name: 'Option',
  type: 'story',
  text: <React.Fragment>
    <p>This is the end of this stage.</p>
    <NextStage target="{stageSlug}" text="proceed to the next stage" />
  </React.Fragment>,
},
```

# User functions
- `test`
- `cost[currency]`
- `options`
- `text` - executed after currencies and errors are processed

# To do
- better documentation
- 'rename' button
- styling
- image functions
- scrolling links
- wide options
- mark unseen option
- random outcomes
- show option currencies in menu
- oragnize options in menu into levels