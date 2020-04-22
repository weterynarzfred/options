import React from 'react';
import PropTypes from 'prop-types';

function Delete(props) {
  return <div
    className="Delete"
    onClick={props.sell}
  >
    <svg viewBox="0 0 100 100">
      <path d="M20 20L80 80" />
      <path d="M20 80L80 20" />
    </svg>
  </div>
}

Delete.propTypes = {
  sell: PropTypes.func,
};

export default Delete;