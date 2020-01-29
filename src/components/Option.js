import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';

function displaySuboptions(option) {
  if (option.options === undefined) return '';
  return displayOptions(option.options);
}

function Option(props) {
  return (
    <div className="Option">
      <div className="Option-name">
        {props.option.name}
      </div>
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
