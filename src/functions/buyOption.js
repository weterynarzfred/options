import prepareOptions from "./prepareOptions";
import { getOption, getParent, clone } from "./helpers";
import { getSelected } from "./getSelected";

export default function buyOption(option, options) {
  option = getOption(option, options);
  if (option.type === 'group') return;
  if (option.hasIndividualChildren) {
    const slug = option.nextChildId++;
    const child = {
      [slug]: {
        type: 'group',
        name: option.name + ' - ' + slug,
        options: Object.create(option.individualOptions),
        isChild: true,
        optionCurrency: clone(option.childOptionCurrency),
      }
    };
    option.selected[slug] = prepareOptions(child, option.path)[slug];
  }
  else {
    const parent = getParent(option, options);
    if (parent && parent.max === 1) {
      const selected = getSelected(parent, options);
      for (const slug in selected) {
        selected[slug].selected--;
      }
    }
    option.selected++;
  }
}
