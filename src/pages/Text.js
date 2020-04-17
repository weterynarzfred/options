import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/Text.module.scss';
import propShapes from '../propShapes';

function getText(text) {
  if (text === undefined) return '';
  if (text.isUserFunction) return text.value;
  return text;
}

function Text(props) {
  if (props.isChangeable) {
    return <div className={styles.Text}>
      <input
        value={getText(props.text)}
        onChange={event => props.change('text', event.target.value)}
      />
    </div>;
  }
  return <div className={styles.Text}>
    {getText(props.text)}
  </div>;
}

Text.propTypes = {
  text: propShapes.text,
  isChangeable: PropTypes.bool,
  change: PropTypes.func,
};

export default Text;