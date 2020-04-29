import getSelectedCount from "./getSelectedCount";
import getUserFunctionValue from "./getUserFunctionValue";
import { getParent } from "./helpers";

export default function isOptionDisabled(option, options) {
  const parent = getParent(option, options);
  if (parent) {
    if (isOptionDisabled(parent, options)) return true;
    if (parent.type === 'option') {
      if (getSelectedCount(parent, options) === 0) return true;
    }
  }
  if (option.test !== undefined) {
    return !getUserFunctionValue(option.test, { option });
  }
  return false;
}
