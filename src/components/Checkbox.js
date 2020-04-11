import React from 'react';
import { connect } from 'react-redux';

function Checkbox(props) {
  return (
    <div className="Checkbox">
      <label onClick={event => event.stopPropagation()}>
        <input
          type="checkbox"
          className="option-checkbox"
          checked={props.option.selected > 0}
          onChange={event => props.dispatch({
            type: event.target.checked ? 'BUY_OPTION' : 'SELL_OPTION',
            option: props.option,
          })}
        />
        <div className="option-checkbox-tick">&#10003;</div>
      </label>
    </div>
  );
}

export default connect()(Checkbox);
