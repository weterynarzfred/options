import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from './../propShapes';
// import SelectControls from './SelectControls';
import Text from './Text';

// function handleBuy(option) {
//   this.dispatch({
//     type: 'BUY_OPTION',
//     option,
//   });
// }

// function handleSell(option) {
//   this.dispatch({
//     type: 'SELL_OPTION',
//     option,
//   });
// }

function Select(props) {
  if (
    props.option.type !== 'group' ||
    props.option.max !== 1
  ) return false;

  if (props.optionInfo.selectableSuboptions.length <= 1) return false;

  const selected = props.optionInfo.selectableSuboptions[props.optionInfo.selectedSuboptionId];

  return <div className="Select">
    <Text
      text={selected.text}
      isChangeable={false}
    />
  </div>
}

Select.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default connect()(Select);