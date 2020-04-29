import isOptionDisabled from './isOptionDisabled';
import getSyntheticOptions from './getSyntheticOptions';

/**
 * Finds suboptions, children or synthetic suboptions of the given option.
 * @param {object} option Option to get suboptions of.
 * @param {object} options Global options.
 * @param {boolean} skipDisabled Remove disabled options from the return value.
 * @returns {object} An object containing suboptions, or an empty object.
 */
export default function getSubptions(option, options, skipDisabled = false, recreate = false) {
  let currentOptions;
  if (option.hasIndividualChildren) {
    currentOptions = option.selected;
  }
  else if (option.optionsFunction !== undefined) {
    currentOptions = getSyntheticOptions(option, options, recreate);
  }
  else {
    currentOptions = option.options;
  }
  if (!currentOptions) return {};

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
