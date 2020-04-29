import getSelectedCount from "../functions/getSelectedCount";
import getUserFunctionValue from "../functions/getUserFunctionValue";

export default function runUserFunctions(option, state, keys) {
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