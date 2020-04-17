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
*not displayed in `optionControls`*
- `option.type === 'group'`
- `option.max === 1`

# option click

## buy option
- `option.type === 'option'`
- `getSelectedCount(option, options) < option.max`

## open option
- `getSuboptions(option, options, true).length > 0`