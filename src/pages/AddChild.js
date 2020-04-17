import React from 'react';
import PropTypes from 'prop-types';

function AddChild(props) {
  return <div
    className="AddChild"
    onClick={props.buy}
  >
    good add child
  </div>
}

AddChild.propTypes = {
  buy: PropTypes.func,
};

export default AddChild;