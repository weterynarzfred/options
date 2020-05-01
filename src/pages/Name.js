import React from 'react';
import PropTypes from 'prop-types';

function Name(props) {
  if (props.isChangeable) {
    return <div className="Name title">
      <input
        value={props.name}
        onChange={event => props.change('name', event.target.value)}
        placeholder="name"
      />
    </div>;
  }
  return <div className="Name title">
    {props.name}
  </div>;
}

Name.propTypes = {
  name: PropTypes.string,
  isChangeable: PropTypes.bool,
  change: PropTypes.func,
};

export default Name;