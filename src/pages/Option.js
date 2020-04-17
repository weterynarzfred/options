import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Text from './Text';
import OptionControls from '../containers/OptionControls';
import getControlType from '../functions/getControlType';
import propShapes from '../propShapes';
import Suboptions from '../containers/Suboptions';
import Name from './Name';
import OptionLinks from '../containers/OptionLinks';
import OptionStats from './OptionStats';

function handleClick(event) {
  if (event.detail.fromOptionControl) return;
  
  switch(getControlType(this.option)) {
    case 'checkbox':
      if (this.option.selected) this.sell();
      else this.buy();
      break;
    case 'spinbox':
      this.buy();
      break;
    default:
  }
}

function Option(props) {
  const optionInfo = props.optionInfo;
  return <div
    className={classNames(
      'Option',
      `OptionControl-${optionInfo.controlType}`,
      `OptionType-${props.option.type}`,
      {OptionSelected: optionInfo.isSelected},
      {OptionOpenable: optionInfo.isOpenable}
    )}
    onClick={handleClick.bind(props)}
  >
    <div className="OptionWrap">
      <OptionControls
        option={props.option}
        sell={props.sell}
        buy={props.buy}
      />
      <OptionStats
        option={props.option}
      />
      <Name
        name={props.option.name}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <Text
        text={props.option.text}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <OptionLinks option={props.option} />
      <Suboptions option={props.option} />
    </div>
  </div>;
}

Option.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
  optionInfo: PropTypes.object,
};

export default Option;