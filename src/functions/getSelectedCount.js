import isOptionDisabled from "./isOptionDisabled";
import getSelected from "./getSelected";

export default function getSelectedCount(option, options) {
  if (isOptionDisabled(option, options)) return false;

  if (option.type === 'option') {
    if (typeof option.selected === 'number') return option.selected;
    return Object.getOwnPropertyNames(option.selected).length;
  }
  return getSelected(option, options, true).length;
}
