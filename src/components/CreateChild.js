import React from 'react';
import { connect } from 'react-redux';
import getSelectedCount from '../functions/getSelectedCount';

function CreateChild(props) {
  let isDisabled = false;
  if (props.option.max !== undefined && props.option.max !== false) {
    const selectedCount = getSelectedCount(props.option, props.options);
    isDisabled = selectedCount >= props.option.max;
  }
  return (
    <div className="CreateChild">
      <button
        className="CreateChild-button"
        onClick={() => props.dispatch({
          type: 'BUY_OPTION',
          option: props.option,
        })}
        disabled={isDisabled}
      >
        <span className="CreateChild-button-text">add new</span>
        <svg viewBox="0 0 100 100">
          <path d="M15 50L85 50" />
          <path d="M50 15L50 85" />
        </svg>
      </button>
    </div>
  );
}

export default connect()(CreateChild);
