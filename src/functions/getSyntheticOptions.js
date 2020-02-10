import prepareOptions from "./prepareOptions";

export default function getSyntheticOptions(option, options) {
  let syntheticOptions = option.optionsFunction({options});
  for (const slug in syntheticOptions) {
    const selected = option.functionalChildren[slug] === undefined ?
      0 : option.functionalChildren[slug].selected;
    syntheticOptions[slug] = {
      name: syntheticOptions[slug].name,
      cost: syntheticOptions[slug].cost,
      isSynthetic: true,
      selected,
    };
  }
  return prepareOptions(syntheticOptions, option.path);
}