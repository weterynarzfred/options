import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

function handleBuyOption() {
  this.dispatch({
    type: 'BUY_OPTION',
    option: this.option,
  });
}

function handleSellOption() {
  this.dispatch({
    type: 'SELL_OPTION',
    option: this.option,
  });
}

function SpinBox(props) {
  const isDisabed = {
    sell: props.option.min !== false && props.option.selected <= props.option.min,
    buy: props.option.max !== false && props.option.selected >= props.option.max,
  };
  return (
    <div className="SpinBox">
      <button
        className={classNames(
          'SpinBox-button',
          'SpinBox-decrease',
        )}
        onClick={handleSellOption.bind(props)}
        disabled={isDisabed.sell}
      >
        <svg viewBox="0 0 100 100">
          <path d="M15 50L85 50" />
        </svg>
      </button>
      <div className="SpinBox-value">{props.option.selected}</div>
      <button
      className={classNames(
        'SpinBox-button',
        'SpinBox-increase',
      )}
        onClick={handleBuyOption.bind(props)}
        disabled={isDisabed.buy}
      >
        <svg viewBox="0 0 100 100">
          <path d="M15 50L85 50" />
          <path d="M50 15L50 95" />
        </svg>
      </button>
    </div>
  );
}

export default connect()(SpinBox);
