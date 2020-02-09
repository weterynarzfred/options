export default function isOptionDisabled(option, props) {
  if (option.test === undefined) return false;
  return !option.test.call(option, props.options);
}