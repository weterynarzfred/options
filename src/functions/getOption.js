import getSyntheticOptions from "./getSyntheticOptions";

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

  let option = { options };
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
    else if (typeof option.selected === 'object' &&
      option.selected[path[path.length - 1]] !== undefined) {
      option = option.selected[path.pop()];
    }
    else {
      break;
    }
  }
  return option;
}
