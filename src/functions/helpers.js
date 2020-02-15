import { getOption } from "./getOption";

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function getParent(option, options) {
  let pathArray = option.path.split('/');
  if (pathArray.length <= 1) return false;
  pathArray.pop();
  return getOption(pathArray, options);
}

// function getCount(option) {
//   option = getOption(option);
//   if (option.selected === undefined) return 0;
//   if (option.selected.length === undefined) return option.selected;
//   return option.selected.length;
// }