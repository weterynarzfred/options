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

/**
 * Creates options from children of another option
 * @param {object} sourceOption Option to copy children from (with hasIndividualChildren)
 * @param {function} forEach function to pass each option through
 * @param {*} data data to pass to the forEach function
 */
export function optionsFromChildren(sourceOption, forEach, data) {
  const result = {};
  for (const slug in sourceOption.selected) {
    const child = sourceOption.selected[slug];
    result[slug] = {
      name: child.name,
    };
    if (typeof forEach === 'function') {
      result[slug] = forEach(result[slug], child, data);
    }
  }
  return result;
}