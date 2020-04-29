import prepareOptions from "./prepareOptions";
import { getParent, clone, deepClone } from "../functions/helpers";
import getOption from "../functions/getOption";
import getSelected from "../functions/getSelected";
import getSelectedCount from "../functions/getSelectedCount";

function buyIndividualChild(option, options) {
  if (option.max !== false && getSelectedCount(option, options) >= option.max) return;

  const slug = option.nextChildId++;
  const childOptions = option.individualOptions === undefined ?
    {} : deepClone(option.individualOptions);
  const childCurrency = option.childOptionCurrency === undefined ?
    undefined : clone(option.childOptionCurrency);
  const childName = option.defaultChildName || option.name;
  const child = {
    [slug]: {
      type: 'group',
      name: childName + ' - ' + slug,
      options: childOptions,
      isChild: true,
      max: false,
      optionCurrency: childCurrency,
    }
  };
  option.selected[slug] = prepareOptions(child, option.path, options)[slug];
}

function deselectSiblings(option, options, parent) {
  if (!option.disableUseAsSelect) {
    if (parent === undefined) {
      parent = getParent(option, options);
    }

    if (
      !parent.disableUseAsSelect &&
      parent && parent.type === 'group' &&
      parent.max === 1 &&
      option.max === 1
    ) {
      const selected = getSelected(parent, options);

      for (const slug in selected) {
        selected[slug].selected--;
      }
    }
  }
}

function buySimpleChild(option, options) {
  if (option.max !== false && option.selected >= option.max) return;

  deselectSiblings(option, options);
  option.selected++;
}

function buySyntheticOption(option, options) {
  if (option.max !== false && option.selected >= option.max) return;

  const parent = getParent(option, options);
  deselectSiblings(option, options, parent);

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
