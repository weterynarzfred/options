import { getChildOptions } from "../components/Option";

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
    option = getChildOptions(option, options)[path.pop()];
  }
  return option;
}
