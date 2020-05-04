import { images } from "./../options";
import replaceFunctions from "./replaceFunctions";

function prepareTypeOption(option) {
  if (option.type !== 'option') return;
  if (option.hasIndividualChildren) {
    option.selected = option.selected === undefined ? {} : option.selected;
    option.nextChildId = 0;
    return;
  }
  option.selected = option.selected === undefined ? option.min : option.selected;
}

export default function prepareOptions(currentOptions, path, options = currentOptions) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];

    option.type = option.type === undefined ? 'option' : option.type;
    option.min = option.min === undefined ? 0 : Math.max(option.min, 0);
    if (option.max !== false) {
      option.max = option.max === undefined ? 1 : Math.max(option.max, 0);
    }
    option.slug = slug;
    option.path = path === undefined ? slug : path + '/' + slug;
    option.image = option.image === undefined ?
      images[option.path.replace(/\//g, '_')] : option.image;
    option.classes = option.classes === undefined ? [] : option.classes;

    if (option.options !== undefined && typeof option.options === 'function') {
      option.functionalChildren = option.functionalChildren === undefined ?
        {} : option.functionalChildren;
    }

    option.options = prepareOptions(option.options, option.path, options);
    prepareTypeOption(option);

    replaceFunctions(option, options);

  }
  return currentOptions;
}
