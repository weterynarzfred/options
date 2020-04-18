import prepareOptions from "./prepareOptions";
import { getParent, clone, deepClone } from "./helpers";
import getOption from "./getOption";
import getSelected from "./getSelected";
import getSelectedCount from "./getSelectedCount";

function buyIndividualChild(option, options) {
  if (option.max !== false && getSelectedCount(option, options) >= option.max) return;

  const slug = option.nextChildId++;
  const childOptions = option.individualOptions === undefined ?
    {} : deepClone(option.individualOptions);
  const childCurrency = option.childOptionCurrency === undefined ?
    undefined : clone(option.childOptionCurrency);
  const child = {
    [slug]: {
      type: 'group',
      name: option.name + ' - ' + slug,
      options: childOptions,
      isChild: true,
      max: false,
      optionCurrency: childCurrency,
    }
  };
  option.selected[slug] = prepareOptions(child, option.path, options)[slug];

}

function buySimpleChild(option, options) {
  if (option.max !== false && option.selected >= option.max) return;

  // deselect siblings
  const parent = getParent(option, options);
  if (
    parent && parent.type === 'group' &&
    parent.max === 1 &&
    option.max === 1
  ) {
    const selected = getSelected(parent, options);

    for (const slug in selected) {
      selected[slug].selected--;
    }
  }

  option.selected++;
}

function buySyntheticOption(option, options) {
  if (option.max !== false && option.selected >= option.max) return;

  const parent = getParent(option, options);
  if (parent.functionalChildren[option.slug] === undefined) {
    parent.functionalChildren[option.slug] = {
      selected: 0,
    };
  }
  parent.functionalChildren[option.slug].selected++;
}

export default function buyOption(option, options) {
  if (option.type === 'group') return;
  if (option.isSynthetic) {
    buySyntheticOption(option, options);
  }
  else {
    option = getOption(option, options);
    if (option.hasIndividualChildren) {
      buyIndividualChild(option, options);
    }
    else {
      buySimpleChild(option, options);
    }
  }
}
