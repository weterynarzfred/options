import { getOption, getParent } from "./helpers";

export default function sellOption(option, options) {
  if (option.isSynthetic) {
    const parent = getParent(option, options);
    parent.functionalChildren[option.slug].selected--;
    return;
  }

  option = getOption(option, options);
  if (option.type === 'option') {
    option.selected--;
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      const parent = getParent(option, options);
      delete parent.selected[option.slug];
    }
  }
}
