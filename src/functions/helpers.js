import getSyntheticOptions from "./getSyntheticOptions";

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function getOption(path, options) {
  if (typeof path === 'object') {
    if (!Array.isArray(path)) {
      path = path.path.split('/').reverse();
    }
    else {
      path.reverse();
    }
  }
  else {
    path = path.split('/').reverse();
  }
  let option = {options};
  
  while (path.length) {
    // if option has functional children
    if (option.optionsFunction !== undefined) {
      option = getSyntheticOptions(option, options)[path.pop()];
    }
    // if options has suboptions
    else if (option.options !== undefined) {
      option = option.options[path.pop()];
    }
    // if option has selected children
    else if (
      typeof option.selected === 'object' &&
      option.selected[path[path.length - 1]] !== undefined
    ) {
      option = option.selected[path.pop()];
    }
    else {
      break;
    }
  }
  // console.log(option ? clone(option) : '');
  
  return option;
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