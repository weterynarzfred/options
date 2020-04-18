import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import Name from './Name';
import OptionControls from '../containers/OptionControls';
import OptionStats from './OptionStats';
import OptionFoot from '../containers/OptionFoot';

function Suboption(props) {
  return <div
    className={classNames(
      'Suboption',
      `OptionControl-${props.optionInfo.controlType}`,
      `OptionType-${props.option.type}`,
      { OptionSelected: props.optionInfo.isSelected },
      { OptionOpenable: props.optionInfo.isOpenable },
      { SelectableSuboption: props.optionInfo.isSelectableSuboption }
    )}
  >
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
    />
    <Name
      name={props.option.name + ': ' + props.optionInfo.depth}
      isChangeable={props.option.isChild}
      change={props.change}
    />
    <OptionStats
      option={props.option}
    />
    <OptionFoot option={props.option} />
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