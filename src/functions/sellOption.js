import { getOption, getParent } from "./helpers";

export default function sellOption(option, options) {
  option = getOption(option, options);
  if (option.type === 'option') {
    option.selected--;
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      const parent = getParent(option, options);
      if (parent) {
        parent.selected.splice(option.slug, 1);
      }
    }
  }
}
