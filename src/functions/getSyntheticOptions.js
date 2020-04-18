import prepareOptions from "./prepareOptions";
import { clone } from "./helpers";
import getUserFunctionValue from "./getUserFunctionValue";

export default function getSyntheticOptions(option, options) {
  getUserFunctionValue(option.optionsFunction, {
    option,
    options,
  });
  
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