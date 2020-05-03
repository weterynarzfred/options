import isOptionDisabled from '../functions/isOptionDisabled';
import getSelectedCount from '../functions/getSelectedCount';
import { getReadablePath } from './../functions/helpers';
import forEachOption from '../functions/forEachOption';

/**
 * Checks if values of global currencies are less than minimum.
 * @param {object} settings Global settings.
 * @param {object} options Global options.
 * @param {array} errors Error array to push errors into.
 */
function checkGlobalCurrencies(settings, options, errors) {
  if (settings.currency === undefined) return;
  for (const currencySlug in settings.currency) {
    const currency = settings.currency[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.currentValue < min) {
      errors.push({
        text: `Currency ${currency.name} cannot be below ${min}.`,
        code: `currency-${currency.slug}`,
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
  for (const currencySlug in option.optionCurrency) {
    const currency = option.optionCurrency[currencySlug];
    const min = currency.min === undefined ? 0 : currency.min;

    if (min !== false && currency.currentValue < min) {
      errors.push({
        path: option.path,
        text: `Currency ${currency.name} in ${getReadablePath(option.path, options)} cannot be below ${min}.`,
        code: `currency-${option.path}-${currency.slug}`,
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
        code: `option-${option.path}-min`,
      });
    }
  }
  if (option.max !== false) {
    if (selectedCount > option.max) {
      errors.push({
        path: option.path,
        text: `Option ${getReadablePath(option.path, options)} cannot have more than ${option.max} selected.`,
        code: `option-${option.path}-max`,
      });
    }
  }
}

/**
 * Finds errors in selected options.
 * @param {object} state Global state.
 */
export default function findErrors(state) {
  state.errors = [];
  forEachOption({ options: state.options }, state, (option, parent, { options, errors }) => {
    if (option.type === 'optionsContainer') return;
    if (isOptionDisabled(option, options)) return;
    checkMinMaxSelected(option, options, errors);
    checkOptionCurrencies(option, options, errors);
  });
  checkGlobalCurrencies(state.settings, state.options, state.errors);
}
