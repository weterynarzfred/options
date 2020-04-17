import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/Name.module.scss';

function Name(props) {
  if (props.isChangeable) {
    return <div className={styles.Name}>
      <input
        value={props.name}
        onChange={event => props.change('name', event.target.value)}
      />
    </div>;
  }
  return <div className={styles.Name}>
    {props.name}
  </div>;
}

Name.propTypes = {
  name: PropTypes.string,
  isChangeable: PropTypes.bool,
  change: PropTypes.func,
};

export default Name;