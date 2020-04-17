import React from 'react';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import Name from './Name';
import OptionControls from '../containers/OptionControls';
import OptionStats from './OptionStats';
import OptionFoot from '../containers/OptionFoot';

function Suboption(props) {
  return <div className="Suboption">
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
    />
    <Name
      name={props.option.name}
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
};

export default Suboption;