import { getOption } from "./helpers";

export function getSelected(option, options) {
  option = getOption(option, options);
  if (option.type === 'option') return false;
  const selected = [];
  for (const slug in option.options) {
    const subOption = option.options[slug];
    if (
      subOption.type === 'option' &&
      subOption.max === 1 &&
      subOption.selected
    ) {
      selected.push(subOption);
    }
  }
  return selected;
}
