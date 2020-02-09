import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';

function displaySuboptions(option) {
  if (option.hasIndividualChildren) return displayOptions(option.selected);
  return displayOptions(option.options);
}

function Option(props) {
  return (
    <div className="Option">
      <OptionCosts option={props.option}/>
      <div className="Option-name">
        {props.option.name}
      </div>
      <OptionControls option={props.option} />
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
