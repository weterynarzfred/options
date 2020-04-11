import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCount } from '../functions/getSelected';

function ChildrenContainer(props) {
  let isDisabled = false;
  if (props.option.max !== undefined && props.option.max !== false) {
    const selectedCount = getSelectedCount(props.option, props.options);
    isDisabled = selectedCount >= props.option.max;
  }
  return (
    <div className="ChildrenContainer">
      <button
        className="ChildrenContainer-increase"
        onClick={() => props.dispatch({
          type: 'BUY_OPTION',
          option: props.option,
        })}
        disabled={isDisabled}
      >+</button>
    </div>
  );
}

export default connect()(ChildrenContainer);
