import getOption from "./getOption";
import { getParent } from "./helpers";

export default function sellOption(option, options, path) {
  if (option.isSynthetic) {
    const parent = getParent(option, options);
    parent.functionalChildren[option.slug].selected--;
    return;
  }

  option = getOption(option, options);
  if (option.type === 'option') {
    if (option.hasIndividualChildren) return;
    if (option.selected <= option.min) return;
    option.selected--;
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      const parent = getParent(option, options);
      delete parent.selected[option.slug];
      if (option.path === path.join('/')) {
        path.pop();
      }
    }
  }
}
