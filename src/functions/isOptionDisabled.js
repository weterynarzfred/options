import getSelectedCount from "./getSelectedCount";
import { getParent } from "./helpers";
import getUserFunctionValue from "./getUserFunctionValue";

export default function isOptionDisabled(option, options) {
  const parent = getParent(option, options);
  if (parent) {
    if (isOptionDisabled(parent, options)) return true;
    if (parent.type === 'option') {
      if (getSelectedCount(parent, options) === 0) return true;
    }
  }
  if (option.test !== undefined) {
    return !getUserFunctionValue(option.test, {options, option});
  }
  return false;
}
