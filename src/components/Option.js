import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import CurrencyStats from './CurrencyStats';

function displaySuboptions(option) {
  if (option.hasIndividualChildren) return displayOptions(option.selected);
  return displayOptions(option.options);
}

function displayOptionCurrency(props) {
  const option = props.option;
  if (option.optionCurrency === undefined) return null;
  return <CurrencyStats
    options={option.hasIndividualChildren ? option.selected : option.options}
    currency={option.optionCurrency}
  />
}

function Option(props) {
  return (
    <div className="Option">
      <div className="Option-stats">
        {displayOptionCurrency(props)}
        <OptionCosts option={props.option}/>
      </div>
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
