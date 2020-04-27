import getControlType from './getControlType';
import getSubptions from './getSubptions';
import getSelectedCount from './getSelectedCount';
import getDepth from './getDepth';
import isOptionDisabled from './isOptionDisabled';

export default function getOptionInfo(option, options) {
  if (option.path === undefined) return { suboptions: options };
  const optionInfo = {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options),
    isSelected: getSelectedCount(option, options) > 0,
    isDisabled: isOptionDisabled(option, options),
    depth: getDepth(option, options),
  };
  optionInfo.isOpenable = Object.keys(optionInfo.suboptions).length > 0;
  optionInfo.image = option.image;
  optionInfo.getStastsFrom = option;

  // controlType === select
  optionInfo.isSelectableSuboption = option.type === 'option' &&
    option.min === 0 &&
    !option.disableUseAsSelect &&
    option.max === 1;

  if (optionInfo.controlType === 'select') {
    optionInfo.selectableSuboptions = [];
    for (const slug in optionInfo.suboptions) {
      const suboption = optionInfo.suboptions[slug];
      if (
        suboption.type === 'option' &&
        suboption.max === 1 &&
        suboption.min === 0 &&
        !suboption.disableUseAsSelect &&
        !isOptionDisabled(suboption, options)
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

    if (optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId] !== undefined) {
      optionInfo.getStastsFrom = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId];
      if (option.useImageOfSelected) {
        optionInfo.image = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId].image;
      }
    }
  }

  return optionInfo;
}