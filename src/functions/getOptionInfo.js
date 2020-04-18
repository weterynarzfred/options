import getControlType from './getControlType';
import getSubptions from './getSubptions';
import getSelectedCount from './getSelectedCount';
import getDepth from './getDepth';

export default function getOptionInfo(option, options) {
  if (option.path === undefined) return { suboptions: options };
  const optionInfo = {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options, true),
    isSelected: getSelectedCount(option, options) > 0,
    depth: getDepth(option, options),
  };
  optionInfo.isOpenable = Object.keys(optionInfo.suboptions).length > 0;

  optionInfo.isSelectableSuboption = option.type === 'option' &&
    option.min === 0 &&
    option.max === 1;

  if (optionInfo.controlType === 'select') {
    optionInfo.selectableSuboptions = [];
    for (const slug in optionInfo.suboptions) {
      const suboption = optionInfo.suboptions[slug];
      if (
        suboption.type === 'option' &&
        suboption.max === 1 &&
        suboption.min === 0
      ) {
        optionInfo.selectableSuboptions.push(suboption);
        if (suboption.selected) {
          optionInfo.selectedSuboptionId = optionInfo.selectableSuboptions.length - 1;
        }
      }
    }
    if (optionInfo.selectableSuboptions.length <= 1) {
      optionInfo.controlType = false;
    }
  }

  return optionInfo;
}