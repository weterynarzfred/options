import React from 'react';
import { connect } from 'react-redux';

function PathLink(props) {
  return (
    <span className="PathLink" onClick={() => props.dispatch({
      type: 'CHANGE_PATH',
      path: props.path.split('/'),
    })}>
      {props.text}/
    </span>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PathLink);
