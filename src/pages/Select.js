import React from 'react';
import PropTypes from 'prop-types';
import propShapes from './../propShapes';
import SelectControls from './SelectControls';
import { connect } from 'react-redux';

function handleBuy(option) {
  this.dispatch({
    type: 'BUY_OPTION',
    option,
  });
}

function handleSell(option) {
  this.dispatch({
    type: 'SELL_OPTION',
    option,
  });
}

function Select(props) {
  if (
    props.option.type !== 'group' ||
    props.option.max !== 1
  ) return false;

  if (props.optionInfo.selectableSuboptions.length <= 1) return false;

  return <div className="Select">
    <SelectControls
      selectedId={props.optionInfo.selectedSuboptionId}
      selectable={props.optionInfo.selectableSuboptions}
      sell={handleSell.bind(props)}
      buy={handleBuy.bind(props)}
      includeEmpty={props.option.min === 0}
    />
  </div>
}

Select.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default connect()(Select);