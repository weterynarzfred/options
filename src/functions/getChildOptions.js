import isOptionDisabled from './isOptionDisabled';
import getSyntheticOptions from './getSyntheticOptions';

export default function getChildOptions(option, options, skipDisabled = false) {
  let currentOptions;
  if (option.hasIndividualChildren) {
    currentOptions = option.selected;
  }
  else if (option.optionsFunction !== undefined) {
    currentOptions = getSyntheticOptions(option, options);
  }
  else {
    currentOptions = option.options;
  }
  if (!currentOptions)
    return {};
  if (skipDisabled) {
    const result = {};
    for (const slug in currentOptions) {
      if (isOptionDisabled(currentOptions[slug], options))
        continue;
      result[slug] = currentOptions[slug];
    }
    return result;
  }
  return currentOptions;
}
