export default function prepareOptions(options, path) {
  for (const slug in options) {
    const option = options[slug];
    option.type = option.type === undefined ? 'option' : option.type;
    option.min = option.min === undefined ? 0 : option.min;
    option.max = option.max === undefined ? 1 : option.max;
    option.slug = slug;
    option.path = path === undefined ? slug : path + '/' + slug;
    if (option.optionsFunction !== undefined) {
      option.functionalChildren = option.functionalChildren === undefined ?
        {} : option.functionalChildren;
    }
    option.options = prepareOptions(option.options, option.path);
    if (option.type === 'option') {
      if (option.hasIndividualChildren) {
        option.selected = option.selected === undefined ? {} : option.selected;
        option.nextChildId = 0;
      }
      else {
        option.selected = option.selected === undefined ? 0 : option.selected;
      }
    }
  }
  return options;
}