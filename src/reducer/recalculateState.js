import calculateCurrency from "./calculateCurrency";
import findErrors from './findErrors';
import getSubptions from "../functions/getSubptions";
import getSelectedCount from "../functions/getSelectedCount";
import getUserFunctionValue from "../functions/getUserFunctionValue";
import isOptionDisabled from "../functions/isOptionDisabled";

function clearUserFunction(userFunction, propName = 'value') {
  if (userFunction === undefined) return;
  if (userFunction.isUserFunction) userFunction[propName] = undefined;
}

function clearUserFunctions(option, keys) {
  for (const key of keys) {
    if (key === 'cost') {
      if (option.cost !== undefined) {
        for (const currencySlug in option.cost) {
          const currency = option.cost[currencySlug];
          if (currency === null || !currency.isUserFunction) continue;
          clearUserFunction(currency);
          clearUserFunction(currency, 'nextValue');
        }
      }
    }
    else {
      clearUserFunction(option[key]);
    }
  }
}

function runUserFunctions(option, state) {
  getUserFunctionValue(option.text, { option });
  getUserFunctionValue(option.test, { option });
  getUserFunctionValue(option.options, { option });
  if (option.cost !== undefined) {
    for (const currencySlug in option.cost) {
      const currency = option.cost[currencySlug];

      if (currency === null || !currency.isUserFunction) continue;
      const selectedCount = getSelectedCount(option, state.options);
      let cost = 0;
      for (let i = 0; i < selectedCount; i++) {
        cost += getUserFunctionValue(currency, {
          index: i,
          option,
        }, false);
      }
      currency.value = cost;
      getUserFunctionValue(currency, {
        index: selectedCount,
        option,
      }, 'nextValue');
    }
  }
}

function getInfo(option, parentOption, state) {
  option.info = {
    isDisabled: parentOption.info.isDisabled || isOptionDisabled(option, state.options),
  };
}


function checkOptions(parentOption, state, keys) {
  if (parentOption.info === undefined) {
    parentOption.info = {};
  }
  const suboptions = getSubptions(parentOption, state.options, false, true);

  for (const slug in suboptions) {
    const option = suboptions[slug];
    runUserFunctions(option, state);
    getInfo(option, parentOption, state);

    checkOptions(option, state);
  }
}

function checkOptionCurrencies(parentOption, options) {
  const suboptions = getSubptions(parentOption, options);
  for (const slug in suboptions) {
    const option = suboptions[slug];
    if (option.optionCurrency !== undefined) {
      checkCurrencies(option.options, option.optionCurrency, options);
    }

    checkOptionCurrencies(option, options);
  }
}

function forEachOption(parentOption, state, callback) {
  const suboptions = getSubptions(parentOption, state.options);

  for (const slug in suboptions) {
    const option = suboptions[slug];
    callback(option, state);
    forEachOption(option, state, callback);
  }
}

function checkCurrencies(currentOptions, currencies, options) {
  for (const currencySlug in currencies) {
    currencies[currencySlug].currentValue = currencies[currencySlug].value;
  }
  calculateCurrency(currentOptions, currencies, options);
}

export default function recalculateState(state) {
  forEachOption(state, state, (option, state) => {
    clearUserFunctions(option, ['test', 'cost', 'options']);
  });
  checkOptions(state, state, ['test', 'cost', 'options']);

  checkOptionCurrencies(state, state.options)
  checkCurrencies(state.options, state.settings.currency, state.options);
  findErrors(state);

  forEachOption(state, state, (option, state) => {
    clearUserFunctions(option, ['text']);
  });
  checkOptions(state, state, ['text']);
}