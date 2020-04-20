import isOptionDisabled from './isOptionDisabled';
import getSubptions from "./getSubptions";
import getSelectedCount from './getSelectedCount';

/**
 * Calculate how much of each currency is left.
 * @param {object} currentOptions Options to check.
 * @param {object} currentValues Current currency values.
 * @param {object} options Global options.
 */
export default function calculateCurrency(currentOptions, currentValues, options) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options))
      continue;
    if (option.type === 'option') {
      const selectedCount = getSelectedCount(option, options);
      if (selectedCount > 0 && option.cost !== undefined) {
        for (const currencySlug in option.cost) {
          if (currentValues[currencySlug] === undefined)
            continue;
          let change = 0;
          if (option.cost[currencySlug].isUserFunction) {
            change = option.cost[currencySlug].value;
          }
          else {
            change = option.cost[currencySlug].value * selectedCount;
          }
          currentValues[currencySlug].currentValue -= change;
        }
      }
    }
    const childOptions = getSubptions(option, options);
    currentValues = calculateCurrency(childOptions, currentValues, options);
  }
  return currentValues;
}
