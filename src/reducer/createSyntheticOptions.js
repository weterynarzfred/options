import prepareOptions from "./prepareOptions";
import { clone } from "../functions/helpers";

export default function createSyntheticOptions(option, options) {
  if (option.options === undefined || !option.options.isUserFunction) return;

  const syntheticOptions = clone(option.options.value);
  for (const slug in syntheticOptions) {
    syntheticOptions[slug] = {
      ...syntheticOptions[slug],
      isSynthetic: true,
      selected: 0,
    };
    if (option.functionalChildren[slug] !== undefined) {
      Object.assign(syntheticOptions[slug], option.functionalChildren[slug]);
    }
    if (syntheticOptions[slug].path === undefined) {
      syntheticOptions[slug] = prepareOptions(
        { [slug]: syntheticOptions[slug] },
        option.path,
        options
      )[slug];
    }
  }

  option.functionalChildren = syntheticOptions;
}