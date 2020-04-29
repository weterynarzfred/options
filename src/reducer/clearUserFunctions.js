function clearUserFunction(userFunction, propName = 'value') {
  if (userFunction === undefined) return;
  if (userFunction.isUserFunction) userFunction[propName] = undefined;
}

export default function clearUserFunctions(option, keys) {
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