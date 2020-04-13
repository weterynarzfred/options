import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import $ from "cash-dom";
import ErrorText from './ErrorText';

function handleUpdate(props) {
  const ErrorsElement = $('.Errors');
  if (ErrorsElement.hasClass('opened')) {
    const container = $('.Errors-container');
    if (props.errors.length === 0) {
      ErrorsElement.removeClass('opened');
      container.css({height: 0});
    }
    else {
      const sizer = $('.Errors-sizer');
      container.css({height: sizer[0].scrollHeight});
    }
  }
}

function Errors(props) {
  useEffect(handleUpdate.bind(null, props));
  return <div className="Errors">
    <div className="Errors-container">
      <div className="Errors-sizer">
        {props.errors.map((error, i) => (
          <ErrorText key={`error-${i}`} path={error.path} text={error.text} />
        ))}
      </div>
    </div>
  </div>;
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Errors);
