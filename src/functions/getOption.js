import getSubptions from "./getSubptions";

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

/**
 * Gets options from the options object
 * @param {Array | Object} path 
 * @param {Object} options 
 */
export default function getOption(path, options) {
  path = getReversedPath(path);

  let option = {options};
  while (path.length) {
    option = getSubptions(option, options)[path.pop()];
  }
  return option;
}
