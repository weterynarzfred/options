import { clone } from './helpers';
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
  let currentValuesClone = clone(currentValues);
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options))
      continue;
    if (option.type === 'option') {
      const selectedCount = getSelectedCount(option, options);
      if (selectedCount > 0 && option.cost !== undefined) {
        for (const currencySlug in option.cost) {
          if (currentValuesClone[currencySlug] === undefined)
            continue;
          let change = 0;
          if (typeof option.cost[currencySlug] === 'number') {
            change = option.cost[currencySlug] * selectedCount;
          }
          else if (typeof option.cost[currencySlug] === 'function') {
            for (let index = 0; index < selectedCount; index++) {
              change += option.cost[currencySlug]({
                option,
                options,
                index,
              });
            }
          }
          currentValuesClone[currencySlug].value -= change;
        }
      }
    }
    const childOptions = getSubptions(option, options);
    currentValuesClone = calculateCurrency(childOptions, currentValuesClone, options);
  }
  return currentValuesClone;
}
