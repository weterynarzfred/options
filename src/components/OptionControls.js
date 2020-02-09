import React from 'react';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';
import SpinBox from './SpinBox';
import ChildrenContainer from './ChildrenContainer';
import RemoveChild from './RemoveChild';

function OptionControls(props) {
  const option = props.option;
  if (option.type === 'option') {
    if (!option.hasIndividualChildren) {
      if (option.max === 1) {
        return <Checkbox option={option}/>;
      }
      else if (props.option.max > 1 || option.max === -1) {
        return <SpinBox option={option}/>;
      }
    }
    else {
      return <ChildrenContainer option={option}/>;
    }
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      return <RemoveChild option={option} />;
    }
  }
  return null;
}

export default connect()(OptionControls);