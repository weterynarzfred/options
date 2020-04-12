import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import $ from "cash-dom";
import PathLink from './PathLink';

function getErrorText(error) {
  if (error.path !== undefined) {
    return <PathLink
      path={error.path}
      text={error.text}
    />;
  }
  return error.text;
}

export function getErrorButton(errors) {
  if (errors.length === 0) return false;
  return <div className="Errors-button" onClick={handleClick}>
    <span>!</span>
  </div>
}

function handleClick(event) {
  const ErrorsElement = $('.Errors');
  const container = $('.Errors-container');
  if (ErrorsElement.hasClass('opened')) {
    ErrorsElement.removeClass('opened');
    container.css({
      height: 0,
    });
  }
  else {
    ErrorsElement.addClass('opened');
    container.css({
      height: container[0].scrollHeight,
    });
  }
}

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
  return (
    <div className="Errors">
      <div className="Errors-container">
        <div className="Errors-sizer">
          {props.errors.map((error, i) => <div className="error" key={`error-${i}`}>
            {getErrorText(error)}
          </div>)}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Errors);
