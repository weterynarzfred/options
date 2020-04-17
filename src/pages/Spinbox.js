import React from 'react';
import PropTypes from 'prop-types';

function Spinbox(props) {
  return <div className="Spinbox">
    <button onClick={props.sell}>-</button>
    good spinbox: {props.selected}
    <button onClick={props.buy}>+</button>
  </div>
}

Spinbox.propTypes = {
  selected: PropTypes.number,
  sell: PropTypes.func,
  buy: PropTypes.func,
};

export default Spinbox;