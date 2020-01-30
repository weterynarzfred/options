import React from 'react';
import { connect } from 'react-redux';

function Checkbox(props) {
  return (
    <div className="Checkbox">
      <input
        type="checkbox"
        checked={props.option.selected > 0}
        onChange={event => props.dispatch({
          type: event.target.checked ? 'BUY_OPTION' : 'SELL_OPTION',
          option: props.option,
        })}
      />
    </div>
  );
}

export default connect()(Checkbox);
