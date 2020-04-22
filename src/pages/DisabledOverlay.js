import React from 'react';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';

function DisabledOverlay(props) {
  if (!props.optionInfo.isDisabled) return false;

  return <div className="OptionDisabledInfo">
    <div className="OptionDisabledMessage">disabled</div>
    <div className="OptionDisabledReason">{props.option.disabledText}</div>
  </div>;
}

DisabledOverlay.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default DisabledOverlay;