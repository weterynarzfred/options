import { getSelectedCount } from "./getSelected";
import isOptionDisabled from "./isOptionDisabled";
import { getOption } from "./getOption";

export default function isPathActive(path, options) {
  const option = getOption(path, options);
  return getSelectedCount(option, options) > 0 &&
    !isOptionDisabled(option, options);
}