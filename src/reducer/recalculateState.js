import calculateCurrency from "./calculateCurrency";
import findErrors from './findErrors';
import isOptionDisabled from "../functions/isOptionDisabled";
import createSyntheticOptions from './createSyntheticOptions';
import runUserFunctions from "./runUserFunctions";
import clearUserFunctions from "./clearUserFunctions";
import getSelectedCount from "../functions/getSelectedCount";
import forEachOption from "../functions/forEachOptino";

function getInfo(option, parentOption, state) {
  option.info = {
    isDisabled: parentOption.info.isDisabled || isOptionDisabled(option, state.options),
    isSelected: getSelectedCount(option, state.options) > 0,
  };
}

function checkCurrencies(currentOptions, currencies, options) {
  for (const currencySlug in currencies) {
    currencies[currencySlug].currentValue = currencies[currencySlug].value;
  }
  calculateCurrency(currentOptions, currencies, options);
}

function checkStages(state) {
  if (!state.settings.usesStages) return;
  if (state.path.length === 0) {
    state.path.push(state.settings.currentStage);
  }
}

export default function recalculateState(state) {
  forEachOption({ options: state.options }, state, option => {
    clearUserFunctions(option, ['test', 'cost', 'options']);
  });
  forEachOption({ options: state.options }, state, (option, parentOption, innerState) => {
    getInfo(option, parentOption, innerState);
    runUserFunctions(option, innerState, ['test', 'cost', 'options']);
  }, (parentOption, innerState) => {
    if (parentOption.info === undefined) {
      parentOption.info = {};
    }
    createSyntheticOptions(parentOption, innerState.options);
  });

  forEachOption({ options: state.options }, state, (option, parentOption, innerState) => {
    if (option.optionCurrency !== undefined) {
      checkCurrencies(option.options, option.optionCurrency, innerState.options);
    }
  });
  checkCurrencies(state.options, state.settings.currency, state.options);
  checkStages(state);
  findErrors(state);

  forEachOption({ options: state.options }, state, option => {
    clearUserFunctions(option, ['text']);
  });
  forEachOption({ options: state.options }, state, (option, parentOption, innerState) => {
    runUserFunctions(option, innerState, ['text']);
  });
}