import calculateCurrency from "./calculateCurrency";
import findErrors from './findErrors';
import getSubptions from "../functions/getSubptions";
import getSelectedCount from "../functions/getSelectedCount";
import getUserFunctionValue from "../functions/getUserFunctionValue";
import isOptionDisabled from "../functions/isOptionDisabled";
import createSyntheticOptions from './createSyntheticOptions';

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

function runUserFunctions(option, state, keys) {
  for (const key of keys) {
    if (key === 'cost') {
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
    else {
      getUserFunctionValue(option[key], { option });
    }
  }
}

function getInfo(option, parentOption, state) {
  option.info = {
    isDisabled: parentOption.info.isDisabled || isOptionDisabled(option, state.options),
  };
}

function forEachOption(parentOption, state, callback, prepareCallback) {
  if (prepareCallback !== undefined) {
    prepareCallback(parentOption, state);
  }
  const suboptions = getSubptions(parentOption, state.options);

  for (const slug in suboptions) {
    const option = suboptions[slug];
    callback(option, parentOption, state);
    forEachOption(option, state, callback, prepareCallback);
  }
}

function checkCurrencies(currentOptions, currencies, options) {
  for (const currencySlug in currencies) {
    currencies[currencySlug].currentValue = currencies[currencySlug].value;
  }
  calculateCurrency(currentOptions, currencies, options);
}

export default function recalculateState(state) {
  forEachOption(state, state, option => {
    clearUserFunctions(option, ['test', 'cost', 'options']);
  });
  forEachOption(state, state, (option, parentOption, state) => {
    runUserFunctions(option, state, ['test', 'cost', 'options']);
  });
  forEachOption(state, state, (option, parentOption, state) => {
    getInfo(option, parentOption, state);
  }, (parentOption, state) => {
    if (parentOption.info === undefined) {
      parentOption.info = {};
    }
    createSyntheticOptions(parentOption, state.options);
  });

  forEachOption(state, state, (option, parentOption, state) => {
    if (option.optionCurrency !== undefined) {
      checkCurrencies(option.options, option.optionCurrency, state.options);
    }
  });
  checkCurrencies(state.options, state.settings.currency, state.options);
  findErrors(state);

  forEachOption(state, state, option => {
    clearUserFunctions(option, ['text']);
  });
  forEachOption(state, state, (option, parentOption, state) => {
    runUserFunctions(option, state, ['text']);
  });
}