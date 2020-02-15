import prepareOptions from "./prepareOptions";
import { getParent, clone } from "./helpers";
import { getOption } from "./getOption";
import { getSelected } from "./getSelected";

function buyIndividualChild(option) {
  const slug = option.nextChildId++;
  const childOptions = option.individualOptions === undefined ?
    {} : Object.create(option.individualOptions);
  const childCurrency = option.childOptionCurrency === undefined ?
    false : clone(option.childOptionCurrency);
  const child = {
    [slug]: {
      type: 'group',
      name: option.name + ' - ' + slug,
      options: childOptions,
      isChild: true,
      optionCurrency: childCurrency,
    }
  };
  option.selected[slug] = prepareOptions(child, option.path)[slug];
  return option;
}

function buySimpleChild(option, options) {
  const parent = getParent(option, options);
  if (parent && parent.max === 1) {
    const selected = getSelected(parent, options);
    for (const slug in selected) {
      selected[slug].selected--;
    }
  }
  option.selected++;
  return option;
}

export default function buyOption(option, options) {
  if (option.isSynthetic) {
    const parent = getParent(option, options);
    if (parent.functionalChildren[option.slug] === undefined) {
      parent.functionalChildren[option.slug] = {
        selected: 0,
      };
    }
    parent.functionalChildren[option.slug].selected++;
    return;
  }
  
  option = getOption(option, options);
  if (option.type === 'group') return;
  if (option.hasIndividualChildren) {
    option = buyIndividualChild(option);
  }
  else {
    option = buySimpleChild(option, options);
  }
}
