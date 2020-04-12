import React from 'react';
import { connect } from 'react-redux';

function RemoveChild(props) {
  return (
    <div className="RemoveChild">
      <button onClick={event => props.dispatch({
        type: 'SELL_OPTION',
        option: props.option,
      })}>
        <svg viewBox="0 0 100 100">
          <path d="M15 15L85 85" />
          <path d="M15 85L85 15" />
        </svg>
      </button>
    </div>
  );
}

export default connect()(RemoveChild);
