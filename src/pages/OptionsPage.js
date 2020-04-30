import React from 'react';
import { TransitionGroup } from 'react-transition-group';

function OptionsPage(props) {
  return <TransitionGroup className="OptionsContainer">
    {props.children}
  </TransitionGroup>;
}

export default OptionsPage;