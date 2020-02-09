import prepareOptions from "./prepareOptions";
import { getOption, getParent, getSelected, clone } from "./helpers";

export default function buyOption(option, options) {
  option = getOption(option, options);
  if (option.type === 'group')
    return;
  if (option.hasIndividualChildren) {
    const slug = option.selected.length;
    const child = {
      [slug]: {
        type: 'group',
        name: option.name + ' - ' + slug,
        options: Object.create(option.individualOptions),
        isChild: true,
        optionCurrency: clone(option.childOptionCurrency),
      }
    };
    option.selected.push(prepareOptions(child, option.path)[slug]);
  }
  else {
    const parent = getParent(option, options);
    if (parent && parent.max === 1) {
      console.log(getSelected(parent, options));
    }
    option.selected++;
  }
}
