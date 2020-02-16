import { getSelectedCount } from "./getSelected";
import { getParent } from "./helpers";

export default function isOptionDisabled(option, options) {
  const parent = getParent(option, options);
  if (parent) {
    if (parent.type === 'option') {
      if (getSelectedCount(parent, options) === 0) return true;
    }
  }
  if (option.test !== undefined) return !option.test({option, options});
  return false;
}