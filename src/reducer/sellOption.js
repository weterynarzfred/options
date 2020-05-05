import getOption from "./../functions/getOption";
import { getParent } from "./../functions/helpers";

export default function sellOption(option, options, path) {
  if (option.isSynthetic) {
    if (option.selected <= option.min) return;
    const parent = getParent(option, options);
    parent.functionalChildren[option.slug].selected--;
    parent.functionalChildren[option.slug].info.isUnseen = false;
    return;
  }

  option = getOption(option, options);
  option.info.isUnseen = false;
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
