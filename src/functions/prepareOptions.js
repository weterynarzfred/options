export default function prepareOptions(options, path) {
  for (const slug in options) {
    const option = options[slug];
    option.type = option.type === undefined ? 'option' : option.type;
    option.max = option.max === undefined ? 1 : option.max;
    option.slug = slug;
    option.path = path === undefined ? slug : path + '/' + slug;
    option.options = prepareOptions(option.options, option.path);
    if (option.type === 'option' && !option.individualChildren) {
      option.selected = 0;
    }
  }
  return options;
}