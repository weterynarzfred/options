import React from 'react';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';
import SpinBox from './SpinBox';
import ChildrenContainer from './ChildrenContainer';
import RemoveChild from './RemoveChild';
import isOptionDisabled from '../functions/isOptionDisabled';

function OptionControls(props) {
  const option = props.option;
  
  if (isOptionDisabled(option, props.options)) return null;
  if (option.type === 'option') {
    if (!option.hasIndividualChildren) {
      if (option.max === 1) {
        return <Checkbox option={option}/>;
      }
      else if (props.option.max > 1 || option.max === false) {
        return <SpinBox option={option}/>;
      }
    }
    else {
      return <ChildrenContainer option={option} options={props.options}/>;
    }
  }
  else if (option.type === 'group') {
    if (option.isChild) {
      return <RemoveChild option={option} />;
    }
  }
  return null;
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(OptionControls);
