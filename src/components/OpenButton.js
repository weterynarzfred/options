import React from 'react';
import { connect } from 'react-redux';

function handleClick(event) {
  event.stopPropagation();
  this.dispatch({
    type: 'CHANGE_PATH',
    path: this.option.path.split('/'),
  });
}

function OpenButton(props) {
  if (
    props.currentlySelected ||
    !props.openable
  ) return false;
  return <button
    className="Option-open"
    onClick={handleClick.bind(props)}
    disabled={props.suboptionsDisabled}
  >
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="10" r="15" />
      <circle cx="50" cy="50" r="15" />
      <circle cx="50" cy="90" r="15" />
    </svg>
  </button>;
}

export default connect()(OpenButton);
