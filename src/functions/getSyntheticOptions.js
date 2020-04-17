import prepareOptions from "./prepareOptions";
import { clone } from "./helpers";
import { runUserFunction } from "./recalculateState";

export default function getSyntheticOptions(option, options) {
  if (option.optionsFunction.value === undefined) {
    runUserFunction(option.optionsFunction, option, {options});
  }
  
  const syntheticOptions = clone(option.optionsFunction.value);

  for (const slug in syntheticOptions) {
    const selected = option.functionalChildren[slug] === undefined ?
      0 : option.functionalChildren[slug].selected;

    syntheticOptions[slug] = {
      ...syntheticOptions[slug],
      isSynthetic: true,
      selected,
    };
  }

  return prepareOptions(syntheticOptions, option.path, options);
}