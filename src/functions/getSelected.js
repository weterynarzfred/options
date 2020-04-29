import getOption from "./getOption";
import isOptionDisabled from "./isOptionDisabled";

export default function getSelected(option, options, skipDisabled = false) {

  const selected = [];
  let suboptions;
  if (option.options !== undefined && option.options.isUserFunction) {
    suboptions = option.functionalChildren;
  }
  else {
    option = getOption(option, options);
    if (option.options === undefined) return false;
    suboptions = option.options;
  }

  for (const slug in suboptions) {
    const suboption = suboptions[slug];
    if (
      suboption.type === 'option' &&
      suboption.max === 1 &&
      !suboption.disableUseAsSelect &&
      suboption.selected
    ) {
      selected.push(suboption);
    }
  }

  if (skipDisabled) {
    return selected.filter(suboption => !isOptionDisabled(suboption, options));
  }
  return selected;
}
