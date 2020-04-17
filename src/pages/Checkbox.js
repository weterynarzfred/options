import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './../styles/Checkbox.module.scss';

function Checkbox(props) {
  return <div
    className={classNames(
      styles.Checkbox,
      {[styles.selected]: props.selected}
    )}
    onClick={() => {
      if (props.selected) props.sell();
      else props.buy();
    }}
  >
    good checkbox
  </div>
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  sell: PropTypes.func,
  buy: PropTypes.func,
};

export default Checkbox;