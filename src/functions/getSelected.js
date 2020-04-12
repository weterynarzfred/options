import { getOption } from "./getOption";
import getSyntheticOptions from "./getSyntheticOptions";
import isOptionDisabled from "./isOptionDisabled";

export function getSelectedCount(option, options) {
  if (isOptionDisabled(option, options)) return false;
  if (option.type === 'option') {
    if (typeof option.selected === 'number') {
      return option.selected;
    }
    return Object.getOwnPropertyNames(option.selected).length;
  }
  const selected = getSelected(option, options);
  return selected.length;
}

// select all boolean options from a group
export function getSelected(option, options) {
  const selected = [];
  if (option.optionsFunction !== undefined) {
    const syntheticOptions = getSyntheticOptions(option, options);
    for (const slug in syntheticOptions) {
      if (option.functionalChildren[slug] !== undefined) {
        const syntheticOption = syntheticOptions[slug];
        syntheticOption.selected = option.functionalChildren[slug].selected;
        selected.push(syntheticOption);
      }
    }
  }
  else {
    option = getOption(option, options);
    if (option.type === 'option') return false;
    for (const slug in option.options) {
      const subOption = option.options[slug];
      if (
        subOption.type === 'option' &&
        subOption.max === 1 &&
        subOption.selected
      ) {
        selected.push(subOption);
      }
    }
  }
  return selected;
}
