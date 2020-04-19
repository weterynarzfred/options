import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Checkbox(props) {
  return <div
    className={classNames(
      "Checkbox",
      { CheckboxSelected: props.selected }
    )}
    onClick={() => {
      if (props.selected) props.sell();
      else props.buy();
    }}
  >
    <svg viewBox="0 0 100 100">
      <path d="M17 53L42 83L77 23" />
    </svg>
  </div>
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  sell: PropTypes.func,
  buy: PropTypes.func,
};

export default Checkbox;