import React from 'react';
import { connect } from 'react-redux';

function OptionErrors(props) {
  return props.errors.filter(error => error.path === props.option.path)
    .map((e, i) => (
      <div className="error" key={`option-error-${i}`}>
        {e.text}
      </div>
    ));
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(OptionErrors);