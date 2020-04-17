import getSubptions from "./getSubptions";
import { userFunctions } from "./prepareOptions";
import getSelectedCount from "./getSelectedCount";

function runUserFunction(userFunction, option, state) {
  if (userFunction === undefined) return;
  if (userFunction.isUserFunction) {
    userFunction.value = userFunctions[userFunction.functionId]({
      option,
      options: state.options, 
      errors: state.errors,
    });
  }
}

function runUserFunctions(option, state) {
  runUserFunction(option.text, option, state);
  runUserFunction(option.optionsFunction, option, state);
  if (option.cost !== undefined) {
    for (const currencySlug in option.cost) {
      const currency = option.cost[currencySlug];
      if (!currency.isUserFunction) continue;
      const selectedCount = getSelectedCount(option, state.options);
      let cost = 0;
      for (let i = 0; i < selectedCount; i++) {
        cost += userFunctions[currency.functionId]({
          index: i,
          option,
          options: state.options, 
          errors: state.errors,
        });
      }
      currency.value = cost;
      currency.nextValue = userFunctions[currency.functionId]({
        index: selectedCount,
        option,
        options: state.options, 
        errors: state.errors,
      });
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

export default function recalculateState(state) {
  checkOptions(state, state);
}