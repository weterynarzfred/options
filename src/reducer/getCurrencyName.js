import settings from "./../settings";
import { clone } from "./../functions/helpers";
import getSubptions from "./../functions/getSubptions";

function findCurrencyNameIn(searchedSlug, currencyGroup) {
  for (const currencySlug in currencyGroup) {
    if (currencySlug === searchedSlug) {
      return currencyGroup[currencySlug].name;
    }
  }
}

export default function getCurrencyName(searchedSlug, option, options) {
  if (settings.currency === undefined) return searchedSlug;
  let name = findCurrencyNameIn(searchedSlug, settings.currency);
  if (name !== undefined) return name;

  const tempPath = clone(option.path).split('/').reverse().filter(e => e !== '');
  let currentOption = { options };
  while (tempPath.length) {
    currentOption = getSubptions(currentOption, options)[tempPath.pop()];
    if (currentOption === undefined) break;
    const currencyGroup = currentOption.optionCurrency || currentOption.childOptionCurrency;
    if (currencyGroup === undefined) break;

    name = findCurrencyNameIn(searchedSlug, settings.currency);
    if (name !== undefined) return name;
  }

  return searchedSlug;
}