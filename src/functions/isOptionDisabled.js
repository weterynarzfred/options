export default function isOptionDisabled(option, options) {
  if (option.test === undefined) return false;
  return !option.test({option, options});
}