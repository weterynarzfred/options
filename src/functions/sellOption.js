import { getOption, getParent } from "./main";

export function sellOption(option, options) {
  option = getOption(option, options);
  if (option.type === 'option') {
    option.selected--;
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      const parent = getParent(option, options);
      if (parent) {
        delete parent.selected[option.slug];
      }
    }
  }
}
