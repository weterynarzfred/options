import React from 'react';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import OptionStats from './OptionStats';
import Name from './Name';
import Text from './Text';
import OptionLinks from '../containers/OptionLinks';
import OptionFoot from '../containers/OptionFoot';
import getUserFunctionValue from "./../functions/getUserFunctionValue";

function OptionBox(props) {

  return <div className="OptionBox">
    <div className="OptionHead">
      <OptionStats
        option={props.getStastsFrom}
      />
    </div>
    <Name
      name={props.option.name}
      isChangeable={props.option.isChild}
      change={props.change.bind(null, props.option)}
    />
    <Text
      text={getUserFunctionValue(props.option.text, { option: props.option })}
      isChangeable={props.option.isChild}
      change={props.change.bind(null, props.option)}
    />
    <OptionLinks
      option={props.option}
      depth={props.optionInfo.depth}
    />
    <OptionFoot option={props.option} />
  </div>
}

Option.propTypes = {
  option: propShapes.option,
  getStastsFrom: propShapes.option,
  change: PropTypes.func,
  optionInfo: PropTypes.object,
};

export default OptionBox;