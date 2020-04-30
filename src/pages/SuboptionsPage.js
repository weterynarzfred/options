import React from 'react';
import { isObject } from '../functions/helpers';

function SuboptionsPage(props) {
  return <div
    className="SuboptionsContainer"
    onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromSuboptions = true;
    }}
  >
    {props.children}
  </div>
}

export default SuboptionsPage;