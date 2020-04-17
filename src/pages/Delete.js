import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/Suboption.module.scss';

function Delete(props) {
  return <div
    className={styles.Delete}
    onClick={props.sell}
  >
    good delete
  </div>
}

Delete.propTypes = {
  sell: PropTypes.func,
};

export default Delete;