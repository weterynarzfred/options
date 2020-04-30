import calculateCurrency from "./calculateCurrency";
import findErrors from './findErrors';
import getSubptions from "../functions/getSubptions";
import isOptionDisabled from "../functions/isOptionDisabled";
import createSyntheticOptions from './createSyntheticOptions';
import runUserFunctions from "./runUserFunctions";
import clearUserFunctions from "./clearUserFunctions";
import getSelectedCount from "../functions/getSelectedCount";

function getInfo(option, parentOption, state) {
  option.info = {
    isDisabled: parentOption.info.isDisabled || isOptionDisabled(option, state.options),
    isSelected: getSelectedCount(option, state.options) > 0,
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
  forEachOption(state, state, (option, parentOption, innerState) => {
    getInfo(option, parentOption, innerState);
    runUserFunctions(option, innerState, ['test', 'cost', 'options']);
  }, (parentOption, innerState) => {
    if (parentOption.info === undefined) {
      parentOption.info = {};
    }
    createSyntheticOptions(parentOption, innerState.options);
  });

  forEachOption(state, state, (option, parentOption, innerState) => {
    if (option.optionCurrency !== undefined) {
      checkCurrencies(option.options, option.optionCurrency, innerState.options);
    }
  });
  checkCurrencies(state.options, state.settings.currency, state.options);
  findErrors(state);

  forEachOption(state, state, option => {
    clearUserFunctions(option, ['text']);
  });
  forEachOption(state, state, (option, parentOption, innerState) => {
    runUserFunctions(option, innerState, ['text']);
  });
}