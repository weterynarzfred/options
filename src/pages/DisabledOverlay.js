import React from 'react';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';

function DisabledOverlay(props) {
  if (!props.option.info.isDisabled) return false;

  return <div className="OptionDisabledInfo" >
    {props.option.image ? <div
      className="OptionDisabledImage"
      style={{
        backgroundImage: `url(${props.option.image})`,
      }}
    ></div> : false}
    <div className="OptionDisabledNameContainer">
      <div className="OptionDisabledName">{props.option.name}</div>
      <div className="OptionDisabledMessage">disabled</div>
    </div>
    <div className="OptionDisabledReason">{props.option.disabledText}</div>
  </div>;
}

DisabledOverlay.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default DisabledOverlay;