# Option

## keys set in options.js
key                    |type      |default   |description
---                    |---       |---       |---
`name`                 |`string`  |`''`      |name that will be displayed
`type`                 |`string`  |`'option'`|type of the option, `'option'`, `'group'` or `'story'`
`text`                 |`string`  |`''`      |text that will be displayed
---                    |`function`|          |function returnig the text

### additional keys when `type == 'option' | 'group'`
key                    |type      |default   |description
---                    |---       |---       |---
`min`                  |`number`  |`0`       |minimum number of times an option can be selected, can be set to `false`
`max`                  |`number`  |`1`       |maximum number of times an option can be selected
`options`              |`object`  |`{}`      |suboptions of the option
`optionCurrency`       |`object`  |`{}`      |currencies to be used in option's suboptions

### additional keys when `type == 'option'`
key                    |type      |default   |description
---                    |---       |---       |---
`hasIndividualChildren`|`bool`    |`false`   |whether each copy of the option creates another option, when set will ignore `options`
`individualOptions`    |`object`  |`{}`      |suboptions of every child, only if `hasIndividualChildren`
`childOptionCurrency`  |`object`  |`{}`      |currencies to be used in option's children's suboptions
`isChild`              |`bool`    |**???**   |**???**
`isSynthetic`          |`bool`    |**???**   |**???**

## function when `text` is a function
### arguments
- `object`
  - `option` &mdash; current option
  - `options` &mdash; all options
### return value
A string containing the text to be displayed.


# To do
- [ ] finish documentation
- [ ] add styles