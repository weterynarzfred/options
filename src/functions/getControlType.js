export default function getControlType(option) {
  if (option.type === 'option') {
    if (option.hasIndividualChildren) {
      return 'addChild';
    }
    if (option.max === 1) {
      return 'checkbox';
    }
    if (option.max > 1 || option.max === false) {
      return 'spinbox';
    }
  }
  if (option.type === 'group') {
    if (option.isChild) {
      return 'delete';
    }
    if (option.max === 1 && !option.disableUseAsSelect) {
      // has an additional test in getOptionsInfo
      return 'select';
    }
  }
  return false;
}