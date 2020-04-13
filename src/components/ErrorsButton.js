import React from 'react';
import $ from "cash-dom";

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

function ErrorsButton(errors) {
  if (errors.length === 0) return false;
  return <div className="Errors-button" onClick={handleClick}>
    <span>!</span>
  </div>;
}

export default ErrorsButton;