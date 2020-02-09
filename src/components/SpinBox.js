import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

function handleBuyOption() {
  if (this.option.max !== -1 && this.option.selected >= this.option.max) return;
  this.dispatch({
    type: 'BUY_OPTION',
    option: this.option,
  });
}

function handleSellOption() {
  if (this.option.selected <= this.option.min) return;
  this.dispatch({
    type: 'SELL_OPTION',
    option: this.option,
  });
}

function SpinBox(props) {
  return (
    <div className="SpinBox">
      <button
        className={classNames(
          'SpinBox-button',
          'SpinBox-decrease',
          {disabled: props.option.selected <= props.option.min},
        )}
        onClick={handleSellOption.bind(props)}
      >-</button>
      <div className="SpinBox-value">{props.option.selected}</div>
      <button
      className={classNames(
        'SpinBox-button',
        'SpinBox-increase',
        {disabled: props.option.max !== -1 &&
          props.option.selected >= props.option.max},
      )}
        onClick={handleBuyOption.bind(props)}
      >+</button>
    </div>
  );
}

export default connect()(SpinBox);
