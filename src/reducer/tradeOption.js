import { getParent } from "../functions/helpers";
import getOption from "../functions/getOption";

function tradeSyntheticOption(option, options, value) {
  const parent = getParent(option, options);
  if (parent.functionalChildren[option.slug] === undefined) {
    parent.functionalChildren[option.slug] = {
      selected: 0,
    };
  }
  parent.functionalChildren[option.slug].selected = value;
}

export default function tradeOption(option, options, value) {
  if (
    option.type === 'group' ||
    option.hasIndividualChildren ||
    (option.max !== false && value > option.max) ||
    value < option.min
  ) return;

  if (option.isSynthetic) {
    tradeSyntheticOption(option, options);
  }
  else {
    option = getOption(option, options);
    option.selected = value;
  }
}
