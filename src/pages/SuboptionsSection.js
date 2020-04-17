import React from 'react';
import styles from './../styles/SuboptionsSection.module.scss';
import { isObject } from '../functions/helpers';

function SuboptionsSection(props) {
  return <div
    className={styles.SuboptionsSection}
    onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromSuboptions = true;
    }}
  >
    {props.children}
  </div>
}

export default SuboptionsSection;