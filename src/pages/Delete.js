import React from 'react';
import PropTypes from 'prop-types';

function Delete(props) {
  return <div
    className="Delete"
    onClick={props.sell}
  >
    good delete
  </div>
}

Delete.propTypes = {
  sell: PropTypes.func,
};

export default Delete;