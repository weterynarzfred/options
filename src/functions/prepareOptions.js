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

function replaceFunctions(option) {
  option.text = replaceFunction(option.text);
  option.optionsFunction = replaceFunction(option.optionsFunction);
  if (option.cost !== undefined) {
    for (const currencySlug in option.cost) {
      option.cost[currencySlug] = replaceFunction(option.cost[currencySlug]);
    }
  }
}

export default function prepareOptions(options, path) {
  for (const slug in options) {
    const option = options[slug];

    option.type = option.type === undefined ? 'option' : option.type;

    option.min = option.min === undefined ? 0 : Math.max(option.min, 0);
    if (option.max !== false) {
      option.max = option.max === undefined ? 1 : Math.max(option.max, 0);
    }

    option.slug = slug;

    option.path = path === undefined ? slug : path + '/' + slug;

    if (option.optionsFunction !== undefined) {
      option.functionalChildren = option.functionalChildren === undefined ?
        {} : option.functionalChildren;
    }

    option.options = prepareOptions(option.options, option.path);

    if (option.type === 'option') {
      if (option.hasIndividualChildren) {
        option.selected = option.selected === undefined ? {} : option.selected;
        option.nextChildId = 0;
      }
      else {
        option.selected = option.selected === undefined ? option.min : option.selected;
      }
    }

    replaceFunctions(option);

  }
  return options;
}

export const userFunctions = [];