import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';
import Checkbox from './Checkbox';
import SpinBox from './SpinBox';

function displaySuboptions(option) {
  if (option.options === undefined) return '';
  return displayOptions(option.options);
}

function displayControls(props) {
  if (props.option.type === 'option') {
    if (!props.option.individualChildren) {
      if (props.option.max === 1) {
        return <Checkbox option={props.option}/>;
      }
      else if (props.option.max > 1) {
        return <SpinBox
          option={props.option}
        />;
      }
    }
  }
}

function Option(props) {
  return (
    <div className="Option">
      <div className="Option-name">
        {props.option.name}
      </div>
      {displayControls(props)}
      <div className="Option-suboptions">
        {displaySuboptions(props.option)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
