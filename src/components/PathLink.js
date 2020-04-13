import React from 'react';
import { connect } from 'react-redux';

function PathLink(props) {
  return (
    <span className="PathLink" onClick={() => props.dispatch({
      type: 'CHANGE_PATH',
      path: props.path.split('/'),
    })}>
      {props.text}
    </span>
  );
}

export default connect()(PathLink);
