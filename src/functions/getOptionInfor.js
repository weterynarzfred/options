import getControlType from '../functions/getControlType';
import getSubptions from '../functions/getSubptions';
import getSelectedCount from '../functions/getSelectedCount';
import getDepth from '../functions/getDepth';

export default function getOptionInfo(option, options) {
  if (option.path === undefined) return { suboptions: options };
  const optionInfo = {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options, true),
    isSelected: getSelectedCount(option, options) > 0,
    depth: getDepth(option, options),
  };
  optionInfo.isOpenable = Object.keys(optionInfo.suboptions).length > 0;

  return optionInfo;
}