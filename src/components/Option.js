import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';
import Checkbox from './Checkbox';

function displaySuboptions(option) {
  if (option.options === undefined) return '';
  return displayOptions(option.options);
}

function handleCheckboxSelect(event) {
  if (event.target.checked) {
    this.dispatch({type: 'BUY_OPTION', option: this.option});
  }
}

function displayControls(props) {
  if (props.option.type === undefined || props.option.type === 'option') {
    if (props.option.max === undefined || props.option.max === 1) {
      return <Checkbox selected={props.option.selected} handleSelect={handleCheckboxSelect.bind(props)} />;
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
