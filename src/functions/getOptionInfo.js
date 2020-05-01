import getControlType from './getControlType';
import getSubptions from './getSubptions';
import getDepth from './getDepth';
import isOptionDisabled from './isOptionDisabled';

export default function getOptionInfo(option, options) {
  if (option.path === undefined) return { suboptions: options };
  const optionInfo = {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options),
    depth: getDepth(option, options),
  };
  optionInfo.isOpenable = Object.keys(optionInfo.suboptions).length > 0;
  optionInfo.image = option.image;
  optionInfo.imageCy = option.imageCy;
  optionInfo.imageCx = option.imageCx;
  optionInfo.getStastsFrom = option;

  // when controlType === select
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
        (
          !isOptionDisabled(suboption, options) ||
          suboption.showWhenDisabled
        )
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

    const selected = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId];
    if (selected !== undefined) {
      optionInfo.getStastsFrom = selected;
      if (!option.dontUseImageOfSelected) {
        optionInfo.image = selected.image;
        optionInfo.imageCy = selected.imageCy;
        optionInfo.imageCx = selected.imageCx;
      }
    }
  }

  return optionInfo;
}
