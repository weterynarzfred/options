import getSubptions from "./getSubptions";
import getSelectedCount from "./getSelectedCount";
import calculateCurrency from "./calculateCurrency";
import getUserFunctionValue from "./getUserFunctionValue";

export function runUserFunction(userFunction, option, state) {
  if (userFunction === undefined) return;
  if (userFunction.isUserFunction) {
    getUserFunctionValue(userFunction, {
      option,
      ...state,
    }, 'value', true);
  }
}

function runUserFunctions(option, state) {
  runUserFunction(option.text, option, state);
  runUserFunction(option.test, option, state);
  runUserFunction(option.optionsFunction, option, state);
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
          ...state,
        }, false);
      }
      currency.value = cost;
      getUserFunctionValue(currency, {
        index: selectedCount,
        option,
        ...state,
      }, 'nextValue', true);
    }
  }
}

function checkOptions(parentOption, state) {
  const suboptions = getSubptions(parentOption, state.options)
  for (const slug in suboptions) {
    const option = suboptions[slug];
    runUserFunctions(option, state);

    checkOptions(option, state);
  }
}

function checkOptionCurrenies(parentOption, options) {
  const suboptions = getSubptions(parentOption, options)
  for (const slug in suboptions) {
    const option = suboptions[slug];
    if (option.optionCurrency !== undefined) {
      checkCurrencies(option.options, option.optionCurrency, options);
    }

    checkOptionCurrenies(option, options);
  }
}

function checkCurrencies(currentOptions, currencies, options) {
  for (const currencySlug in currencies) {
    currencies[currencySlug].currentValue = currencies[currencySlug].value;
  }
  calculateCurrency(currentOptions, currencies, options);
}

export default function recalculateState(state) {
  checkOptions(state, state);
  checkOptionCurrenies(state, state.options)
  checkCurrencies(state.options, state.settings.currency, state.options);
}