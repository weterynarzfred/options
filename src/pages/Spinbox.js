import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'cash-dom';

function handleBlur(setCurrentVal, event) {
  let value = Math.max(event.target.value, this.min);
  if (this.max !== false) value = Math.min(value, this.max);
  setCurrentVal(value);
  this.trade(value);
}

function Spinbox(props) {
  const [currenVal, setCurrentVal] = useState(props.selected);
  useEffect(() => {
    setCurrentVal(props.selected);
  }, [props.selected]);

  const attr = {};
  if (props.max !== false) attr.max = props.max;
  return <div className="Spinbox">
    <button onClick={props.sell}>
      <svg viewBox="0 0 100 100">
        <path d="M20 50L80 50" />
      </svg>
    </button>
    <input
      type="number"
      value={currenVal}
      min={props.min}
      {...attr}
      onChange={event => setCurrentVal(event.target.value)}
      onBlur={handleBlur.bind(props, setCurrentVal)}
      onKeyDown={event => {
        if (event.which === 13) {
          $(event.currentTarget).trigger('blur');
        }
      }}
    />
    <button onClick={props.buy}>
      <svg viewBox="0 0 100 100">
        <path d="M20 50L80 50" />
        <path d="M50 20L50 80" />
      </svg>
    </button>
  </div>
}

Spinbox.propTypes = {
  selected: PropTypes.number,
  sell: PropTypes.func,
  buy: PropTypes.func,
  trade: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
};

export default Spinbox;