import React from 'react';
import styles from './../styles/OptionsSection.module.scss';

function OptionsSection(props) {
  return <div className={styles.OptionsSection}>
    {props.children}
  </div>
}

export default OptionsSection;