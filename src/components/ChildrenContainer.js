import React from 'react';
import { connect } from 'react-redux';

function ChildrenContainer(props) {
  return (
    <div className="ChildrenContainer">
      <button
        className="ChildrenContainer-increase"
        onClick={() => props.dispatch({
          type: 'BUY_OPTION',
          option: props.option,
        })}
      >+</button>
    </div>
  );
}

export default connect()(ChildrenContainer);
