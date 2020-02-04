import React from 'react';
import { connect } from 'react-redux';

function RemoveChild(props) {
  return (
    <div className="RemoveChild">
      <button onClick={event => props.dispatch({
        type: 'SELL_OPTION',
        option: props.option,
      })}>delete</button>
    </div>
  );
}

export default connect()(RemoveChild);
