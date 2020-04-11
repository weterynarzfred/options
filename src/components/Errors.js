import React from 'react';
import { connect } from 'react-redux';

function Errors(props) {
  return (
    <div className="Errors">
      {props.errors.map((e, i) => <div className="error" key={`error-${i}`}>
        {e.text}
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
