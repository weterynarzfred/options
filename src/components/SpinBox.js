import React from 'react';
import { connect } from 'react-redux';

function SpinBox(props) {
  return (
    <div className="SpinBox">
      <button
        className="SpinBox-button SpinBox-decrease"
        onClick={() => props.dispatch({
          type: 'SELL_OPTION',
          option: props.option,
        })}
      >-</button>
      <div className="SpinBox-value">{props.option.selected}</div>
      <button
        className="SpinBox-button SpinBox-increase"
        onClick={() => props.dispatch({
          type: 'BUY_OPTION',
          option: props.option,
        })}
      >+</button>
    </div>
  );
}

export default connect()(SpinBox);
