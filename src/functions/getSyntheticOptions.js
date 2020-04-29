import prepareOptions from "./../reducer/prepareOptions";
import { clone } from "./helpers";

export default function getSyntheticOptions(option, options, recreate = false) {

  if (recreate) {
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
    return syntheticOptions;
  }

  return option.functionalChildren;
}