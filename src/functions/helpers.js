import getOption from "./getOption";
import getSelectedCount from "./getSelectedCount";

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function deepClone(object) {
  if (!object) {
    return object;
  }

  if (typeof object === 'function') return object;

  let v;
  let bObject = Array.isArray(object) ? [] : {};
  for (const k in object) {
    v = object[k];
    bObject[k] = (typeof v === "object") ? deepClone(v) : v;
  }

  return bObject;
}

export function getParent(option, options) {
  let pathArray = option.path.split('/');
  if (pathArray.length <= 1) return false;
  pathArray.pop();
  return getOption(pathArray, options);
}

/**
 * Creates options from children of another option.
 * @param {object} sourceOption Option to copy children from (with hasIndividualChildren).
 * @param {function} forEach Function to pass each option through.
 * @param {*} data Data to pass to the forEach function.
 */
export function optionsFromChildren(sourceOption, forEach, data) {
  const result = {};
  for (const slug in sourceOption.selected) {
    const source = sourceOption.selected[slug];
    result[slug] = {
      name: source.name,
    };
    if (typeof forEach === 'function') {
      result[slug] = forEach(result[slug], source, data);
    }
  }
  return result;
}

/**
 * Checks if the option at the specified path is selected.
 * @param {string} path Path to check.
 * @param {object} options Global options.
 */
export function checkIfPathSelected(path, options) {
  return getSelectedCount(getOption(path, options), options) > 0;
}

/**
 * Checks if the provided value is an object.
 * @param {*} value Value to be checked.
 * @returns {bool} `true` if `value` was an object. `false` otheriwise.
 */
export function isObject(value) {
  if (value === null) return false;
  return ((typeof value === 'function') || (typeof value === 'object'));
}