import React from 'react';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';
import SpinBox from './SpinBox';
import CreateChild from './CreateChild';
import RemoveChild from './RemoveChild';

function OptionControls(props) {
  const option = props.option;
  
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
      return <CreateChild option={option} options={props.options}/>;
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
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionControls);
