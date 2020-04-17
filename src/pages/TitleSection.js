import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles/TitleSection.module.scss';
import Text from './Text';
import propShapes from '../propShapes';

function TitleSection(props) {
  return <div className={styles.TitleSection}>
    <div className={styles.title}>{props.title}</div>
    <Text text={props.text} />
  </div>
}

TitleSection.propTypes = {
  title: PropTypes.node,
  text: propShapes.text,
};

export default TitleSection;