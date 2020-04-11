import { calculateCurrency } from './../components/CurrencyStats';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getChildOptions } from './../components/Option';
import { getSelectedCount } from '../functions/getSelected';
import { clone } from '../functions/helpers';

function checkGlobalCurrencies(settings, options, errors) {
  if (settings.currency === undefined) return;
  const currentValues = calculateCurrency(
    options,
    clone(settings.currency),
    options
  );
  for (const currencySlug in currentValues) {
    const currency = currentValues[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.value < min) {
      errors.push({
        text: `Currency ${currency.name} cannot be below ${min}.`,
      });
    }
  }
}

/** Checks if an option is selected less than minimum or more than maximum times
 * @param {object} option The option to be checked
 * @param {object} options All options
 * @param {array} errors Errors array to push errors into
 */
function checkMinMaxSelected(option, options, errors) {
  if (option.min === false && option.max === false) return;
  const selectedCount = getSelectedCount(option, options);
  if (option.min !== false) {
    if (selectedCount < option.min) {
      errors.push({
        path: option.path,
        text: `Option ${option.path} cannot have less than ${option.min} selected.`,
      });
    }
  }
  if (option.max !== false) {
    if (selectedCount > option.max) {
      errors.push({
        path: option.path,
        text: `Option ${option.path} cannot have more than ${option.max} selected.`,
      });
    }
  }
}

function checkOptionCurrencies(option, options, errors) {
  if (option.optionCurrency === undefined) return;
  const currentValues = calculateCurrency(
    getChildOptions(option, options),
    clone(option.optionCurrency),
    options
  );
  for (const currencySlug in currentValues) {
    const currency = currentValues[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.value < min) {
      errors.push({
        path: option.path,
        text: `Currency ${currency.name} in ${option.path} cannot be below ${min}.`,
      });
    }
  }
}

function checkOptions(options, currentOptions = options) {
  const errors = [];
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options)) continue;
    checkMinMaxSelected(option, options, errors);
    checkOptionCurrencies(option, options, errors);
    const childOptions = getChildOptions(option, options);
    if (childOptions !== undefined) {
      errors.push(...checkOptions(options, childOptions));
    }
  }
  return errors;
}

export default function findErrors(state) {
  state.errors = checkOptions(state.options);
  checkGlobalCurrencies(state.settings, state.options, state.errors);
}
