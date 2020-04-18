import { clone } from "./helpers";
import getSubptions from "./getSubptions";
import settings from "./../settings";

function getCurrencyName(searchedSlug, option, options) {
  if (settings.currency !== undefined) {
    for (const currencySlug in settings.currency) {
      if (currencySlug === searchedSlug) {
        return settings.currency[currencySlug].name;
      }
    }
  }

  const tempPath = clone(option.path).split('/').reverse().filter(e => e !== '');
  let currentOption = {options};
  while (tempPath.length) {
    currentOption = getSubptions(currentOption, options)[tempPath.pop()];
    if (currentOption === undefined) break;
    if (currentOption.optionCurrency !== undefined) {
      for (const currencySlug in currentOption.optionCurrency) {
        if (currencySlug === searchedSlug) {
          return currentOption.optionCurrency[currencySlug].name;
        }
      }
    }
    if (currentOption.childOptionCurrency !== undefined) {
      for (const currencySlug in currentOption.childOptionCurrency) {
        if (currencySlug === searchedSlug) {
          return currentOption.childOptionCurrency[currencySlug].name;
        }
      }
    }
  }

  return searchedSlug;
}

function replaceFunction(userFunction) {
  if (userFunction === undefined) return undefined;
  if (typeof userFunction === 'function') {
    userFunctions.push(userFunction);
    userFunction = {
      isUserFunction: true,
      functionId: userFunctions.length - 1
    };
  }
  return userFunction;
}

function replaceFunctions(option, options) {
  option.text = replaceFunction(option.text);
  option.test = replaceFunction(option.test);
  option.optionsFunction = replaceFunction(option.optionsFunction);
  
  if (option.cost !== undefined) {
    for (const currencySlug in option.cost) {
      if (option.cost[currencySlug] === null) continue;
      option.cost[currencySlug] = replaceFunction(option.cost[currencySlug]);
      if (!option.cost[currencySlug].isUserFunction) {
        option.cost[currencySlug] = {
          value: option.cost[currencySlug],
          nextValue: option.cost[currencySlug],
        };
      }
      option.cost[currencySlug].name = getCurrencyName(currencySlug, option, options);
    }
  }
}

export default function prepareOptions(currentOptions, path, options = currentOptions) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];

    option.type = option.type === undefined ? 'option' : option.type;

    option.min = option.min === undefined ? 0 : Math.max(option.min, 0);
    if (option.max !== false) {
      option.max = option.max === undefined ? 1 : Math.max(option.max, 0);
    }

    option.slug = slug;

    option.path = path === undefined ? slug : path + '/' + slug;

    if (option.optionsFunction !== undefined) {
      option.functionalChildren = option.functionalChildren === undefined ?
        {} : option.functionalChildren;
    }

    option.options = prepareOptions(option.options, option.path, options);

    if (option.type === 'option') {
      if (option.hasIndividualChildren) {
        option.selected = option.selected === undefined ? {} : option.selected;
        option.nextChildId = 0;
      }
      else {
        option.selected = option.selected === undefined ? option.min : option.selected;
      }
    }

    replaceFunctions(option, options);

  }
  return currentOptions;
}

export const userFunctions = [];