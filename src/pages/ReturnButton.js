import React from 'react';
import PropTypes from 'prop-types';
import PathLink from '../containers/PathLink';

function ReturnButton(props) {
  if (props.path.length === 0) return false;

  const text = <svg viewBox="0 0 133 100">
    <path d="M70 10L10 50L70 90z" />
    <path d="M75 50L123 50" />
  </svg>;
  return <div className="ReturnButton">
    <PathLink
      previous={true}
      text={text}
    />
  </div>;
}

ReturnButton.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string),
};

export default ReturnButton;