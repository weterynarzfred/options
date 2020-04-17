import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/AddChild.module.scss';

function AddChild(props) {
  return <div
    className={styles.AddChild}
    onClick={props.buy}
  >
    good add child
  </div>
}

AddChild.propTypes = {
  buy: PropTypes.func,
};

export default AddChild;