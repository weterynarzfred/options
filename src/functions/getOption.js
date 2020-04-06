import { getChildOptions } from "../components/Option";

/**
 * Gets options from the options object
 * @param {Array | Object} path 
 * @param {Object} options 
 */
export function getOption(path, options) {
  path = getReversedPath(path);

  let option = {options};
  while (path.length) {
    option = getChildOptions(option, options)[path.pop()];
  }
  return option;
}

function getReversedPath(path) {
  if (typeof path === 'object') {
    if (!Array.isArray(path)) {
      path = path.path.split('/');
    }
  }
  else {
    path = path.split('/');
  }
  return path.reverse().filter(e => e !== '');
}