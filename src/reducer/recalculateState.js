import calculateCurrency from "./calculateCurrency";
import findErrors from './findErrors';
import getSubptions from "../functions/getSubptions";
import isOptionDisabled from "../functions/isOptionDisabled";
import createSyntheticOptions from './createSyntheticOptions';
import runUserFunctions from "./runUserFunctions";
import clearUserFunctions from "./clearUserFunctions";

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
    getInfo(option, parentOption, state);
    runUserFunctions(option, state, ['test', 'cost', 'options']);
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