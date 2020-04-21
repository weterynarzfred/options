import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import Name from './Name';
import Text from './Text';
import OptionControls from '../containers/OptionControls';
import OptionStats from './OptionStats';
import OptionFoot from '../containers/OptionFoot';
import Image from './Image';

function Suboption(props) {
  const optionInfo = props.optionInfo;

  let image = props.option.image;
  let getStastsFrom = props.option;
  if (optionInfo.controlType === 'select') {
    if (optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId] !== undefined) {
      getStastsFrom = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId];
      if (props.option.useImageOfSelected) {
        image = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId].image;
      }
    }
  }

  return <div
    className={classNames(
      'Suboption',
      `OptionControl-${optionInfo.controlType}`,
      `OptionType-${props.option.type}`,
      { OptionSelected: optionInfo.isSelected },
      { OptionOpenable: optionInfo.isOpenable },
      { SelectableSuboption: optionInfo.isSelectableSuboption }
    )}
  >
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
      trade={props.trade}
      optionInfo={optionInfo}
    />
    <div className="SuboptionWrap">
      <Image src={image} />
      <Name
        name={props.option.name}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <OptionStats
        option={getStastsFrom}
      />
      <Text
        text={props.option.text}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <OptionFoot option={props.option} />
    </div>
  </div>
}

Suboption.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
  change: PropTypes.func,
  optionInfo: PropTypes.object,
};

export default Suboption;