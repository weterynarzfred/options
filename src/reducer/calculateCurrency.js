import isOptionDisabled from '../functions/isOptionDisabled';
import getSubptions from "../functions/getSubptions";
import getSelectedCount from '../functions/getSelectedCount';

/**
 * Calculate how much of each currency is left.
 * @param {object} currentOptions Options to check.
 * @param {object} currentValues Current currency values.
 * @param {object} options Global options.
 * @param {string} restrictTo Restrict calculation only to the option with this slug.
 */
export default function calculateCurrency(currentOptions, currentValues, options, restrictTo) {
  for (const slug in currentOptions) {
    if (restrictTo !== undefined && slug !== restrictTo) continue;
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options)) continue;
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
