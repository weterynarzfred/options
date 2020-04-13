import isOptionDisabled from "./isOptionDisabled";

/**
 * Checks if an option should be displayed.
 * @param {object} option option to be checked
 * @param {object} props object with part of the state
 * @param {object} props.options all options
 * @param {object} props.settings global settings
 * @param {array} props.path global path
 */
export default function isOptionDisplayed(option, props) {
  const currentDepth = props.path.filter(e => e).length;
  const depth = option.path.split('/').length - currentDepth;
  if (depth > props.settings.maxDepth) {
    return false;
  }
  if (props.settings.hideDisabledOptions) {
    return !isOptionDisabled(option, props.options);
  }
  return true;
}
