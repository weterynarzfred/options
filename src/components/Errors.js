import React from 'react';
import { connect } from 'react-redux';
import PathLink from './PathLink';

function getPathLink(error) {
  if (error.path !== undefined) {
    return <PathLink
      path={error.path}
      text={error.text}
    />;
  }
  return error.text;
}

function Errors(props) {
  return (
    <div className="Errors">
      {props.errors.map((error, i) => <div className="error" key={`error-${i}`}>
        {getPathLink(error)}
      </div>)}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Errors);
