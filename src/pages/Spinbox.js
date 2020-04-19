import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
      max={props.max}
      onChange={event => setCurrentVal(event.target.value)}
      onBlur={handleBlur.bind(props, setCurrentVal)}
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
  max: PropTypes.number,
};

export default Spinbox;