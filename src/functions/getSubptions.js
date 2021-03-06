import isOptionDisabled from './isOptionDisabled';

/**
 * Finds suboptions, children or synthetic suboptions of the given option.
 * @param {object} option Option to get suboptions of.
 * @param {object} options Global options.
 * @param {boolean} skipDisabled Remove disabled options from the return value.
 * @returns {object} An object containing suboptions, or an empty object.
 */
export default function getSubptions(option, options, skipDisabled = false) {
  let currentOptions;
  if (option.hasIndividualChildren) {
    currentOptions = option.selected;
  }
  else if (option.options !== undefined && option.options.isUserFunction) {
    currentOptions = option.functionalChildren;
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
