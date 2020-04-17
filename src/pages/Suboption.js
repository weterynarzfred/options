import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/Suboption.module.scss';
import propShapes from '../propShapes';
import Name from './Name';
import OptionControls from '../containers/OptionControls';

function Suboption(props) {
  return <div className={styles.Suboption}>
    <div className={styles.controls}>
      <OptionControls
        option={props.option}
        sell={props.sell}
        buy={props.buy}
      />
    </div>
    <div className={styles.title}>
      <Name
        name={props.option.name}
        isChangeable={props.option.isChild}
        change={props.change}
      />
    </div>
  </div>
}

Suboption.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
};

export default Suboption;