import { calculateCurrency } from './../components/CurrencyStats';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getChildOptions } from './../components/Option';
import { getSelectedCount } from '../functions/getSelected';
import { getOption } from './getOption';

/**
 * Transforms path into a nice readable form.
 * @param {string} path Path to transform.
 * @param {object} options Global options.
 */
function getReadablePath(path, options) {
  const pathArray = path.split('/');
  const readableArray = [];
  for (let i = 0; i < pathArray.length; i++) {
    readableArray.push(getOption(pathArray.slice(0, i + 1), options).name);
  }
  return readableArray.join(' / ');
}

/**
 * Checks if values of global currencies are less than minimum.
 * @param {object} settings Global settings.
 * @param {object} options Global options.
 * @param {array} errors Error array to push errors into.
 */
function checkGlobalCurrencies(settings, options, errors) {
  if (settings.currency === undefined) return;
  const currentValues = calculateCurrency(options, settings.currency, options);
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

/**
 * Checks if values of option's currencies are less than minimum.
 * @param {object} option The option to be checked.
 * @param {object} options Global options.
 * @param {array} errors Error array to push errors into.
 */
function checkOptionCurrencies(option, options, errors) {
  if (option.optionCurrency === undefined) return;
  const currentValues = calculateCurrency(
    getChildOptions(option, options),
    option.optionCurrency,
    options
  );
  for (const currencySlug in currentValues) {
    const currency = currentValues[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.value < min) {
      errors.push({
        path: option.path,
        text: `Currency ${currency.name} in ${getReadablePath(option.path, options)} cannot be below ${min}.`,
      });
    }
  }
}

/** Checks if an option is selected less than minimum or more than maximum times.
 * @param {object} option The option to be checked.
 * @param {object} options Global options.
 * @param {array} errors Error array to push errors into.
 */
function checkMinMaxSelected(option, options, errors) {
  if (option.min === false && option.max === false) return;
  const selectedCount = getSelectedCount(option, options);
  if (option.min !== false) {
    if (selectedCount < option.min) {
      errors.push({
        path: option.path,
        text: `Option ${getReadablePath(option.path, options)} cannot have less than ${option.min} selected.`,
      });
    }
  }
  if (option.max !== false) {
    if (selectedCount > option.max) {
      errors.push({
        path: option.path,
        text: `Option ${getReadablePath(option.path, options)} cannot have more than ${option.max} selected.`,
      });
    }
  }
}

/**
 * Checks options for errors.
 * @param {object} options Global options.
 * @param {object} currentOptions Options to be checked.
 * @param {array} errors Error array to push errors into.
 */
function checkOptions(options, errors, currentOptions = options) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options)) continue;
    checkMinMaxSelected(option, options, errors);
    checkOptionCurrencies(option, options, errors);
    const childOptions = getChildOptions(option, options);
    if (childOptions !== undefined) {
      checkOptions(options, errors, childOptions);
    }
  }
}

/**
 * Finds errors in selected options.
 * @param {object} state Global state.
 */
export default function findErrors(state) {
  state.errors = [];
  checkOptions(state.options, state.errors);
  checkGlobalCurrencies(state.settings, state.options, state.errors);
}
