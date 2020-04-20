import getSubptions from "./getSubptions";
import { clone } from "./helpers";

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
  const tempPath = getReversedPath(clone(path));

  let option = { options };
  while (tempPath.length) {
    option = getSubptions(option, options)[tempPath.pop()];
  }
  return option;
}
