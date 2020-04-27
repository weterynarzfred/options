import getOption from "./getOption";
import getSyntheticOptions from "./getSyntheticOptions";
import isOptionDisabled from "./isOptionDisabled";

export default function getSelected(option, options, skipDisabled = false) {
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
    if (
      option.options === undefined ||
      option.disableUseAsSelect
    ) return false;
    for (const slug in option.options) {
      const suboption = option.options[slug];
      if (
        suboption.type === 'option' &&
        suboption.max === 1 &&
        !suboption.disableUseAsSelect &&
        suboption.selected
      ) {
        selected.push(suboption);
      }
    }
  }
  if (skipDisabled) {
    return selected.filter(suboption => !isOptionDisabled(suboption, options));
  }
  return selected;
}
