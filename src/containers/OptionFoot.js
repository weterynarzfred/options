import React from 'react';
import { connect } from 'react-redux';
import propShapes from '../propShapes';

function OptionFoot(props) {
  const errors = [];
  for (const error of props.errors) {
    if (error.path !== props.option.path) continue;
    errors.push(<div className="error" key={`option-error-${error.code}`}>
      {error.text}
    </div>);
  }
  return <div className="OptionFoot">
    {errors}
  </div>
}

OptionFoot.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    options: state.options,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(OptionFoot);