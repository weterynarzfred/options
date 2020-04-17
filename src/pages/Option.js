import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './../styles/Option.module.scss';
import Text from './Text';
import OptionControls from '../containers/OptionControls';
import getControlType from '../functions/getControlType';
import propShapes from '../propShapes';
import Suboptions from '../containers/Suboptions';
import Name from './Name';

function handleClick(event) {
  if (event.detail.fromOptionControl) return;
  
  switch(getControlType(this.option)) {
    case 'checkbox':
      if (this.option.selected) this.sell();
      else this.buy();
      break;
    case 'spinbox':
      this.buy();
      break;
    case 'addChild':
      // ?
      break;
    case 'delete':
      // ?
      break;
    default:
      return false;
  }
}

function Option(props) {
  const controlType = getControlType(props.option);
  return <div
    className={classNames(
      styles.Option,
      styles[`control-${controlType}`]
    )}
    onClick={handleClick.bind(props)}
  >
    <div className={styles.OptionWrap}>
      <OptionControls
        option={props.option}
        sell={props.sell}
        buy={props.buy}
      />
      <div className={styles.title}>
        <Name
          name={props.option.name}
          isChangeable={props.option.isChild}
          change={props.change}
        />
      </div>
      <div className={styles.text}>
        <Text
          text={props.option.text}
          isChangeable={props.option.isChild}
          change={props.change}
        />
      </div>
      <Suboptions
        option={props.option}
      />
    </div>
  </div>;
}

Option.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
};

export default Option;