import getCurrencyName from "./getCurrencyName";
import userFunctions from "./../userFunctions";

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

export default function replaceFunctions(option, options) {
  option.text = replaceFunction(option.text);
  option.test = replaceFunction(option.test);
  option.options = replaceFunction(option.options);

  if (option.cost === undefined) return;
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