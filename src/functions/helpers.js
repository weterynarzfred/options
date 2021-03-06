import getOption from "./getOption";

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function deepClone(object) {
  if (
    !object ||
    (
      object.$$typeof !== undefined &&
      object.$$typeof.toString() === 'Symbol(react.element)'
    )
  ) return object;

  let v;
  let bObject = Array.isArray(object) ? [] : {};
  for (const k in object) {
    v = object[k];
    bObject[k] = (typeof v === "object") ? deepClone(v) : v;
  }

  return bObject;
}

export function getParent(option, options) {
  if (option.path === undefined) return false;
  let pathArray = option.path.split('/');
  if (pathArray.length <= 1) return false;
  pathArray.pop();
  return getOption(pathArray, options);
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

/**
 * Transforms path into a nice readable form.
 * @param {string} path Path to transform.
 * @param {object} options Global options.
 */
export function getReadablePath(path, options, separator = ' / ') {
  const pathArray = path.split('/');
  const readableArray = [];
  for (let i = 0; i < pathArray.length; i++) {
    readableArray.push(getOption(pathArray.slice(0, i + 1), options).name);
  }
  return readableArray.join(separator);
}

export function replaceLastOccurence(subject, pattern, replacement) {
  const n = subject.lastIndexOf(pattern);
  if (n >= 0) {
    return subject.substring(0, n) +
      replacement +
      subject.substring(n + pattern.length);
  }
  return subject;
}