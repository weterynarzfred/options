import getOption from '../functions/getOption';
import { clone } from '../functions/helpers';

/**
 * Get all currencies option with provided path can have.
 * @param {object} props Global props.
 * @param {object} props.options Global options.
 * @param {object} props.settings Global settings.
 * @param {array} path Path of the option being checked.
 * @returns {object} Object containing possible currencies.
 */
export default function getCurrencies(props, path) {
  const currencies = clone(props.settings.currency);
  const tempPath = clone(path).reverse();
  let currentPath = '';

  while (tempPath.length > 0) {
    currentPath += '/' + tempPath.pop();
    const option = getOption(currentPath, props.options);
    if (option.optionCurrency !== undefined) {
      Object.assign(currencies, option.optionCurrency);
    }
  }
  return currencies;
}