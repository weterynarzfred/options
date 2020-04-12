import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from './CurrencyStats';
import { getChildOptions } from './Option';

function OptionCurrency(props) {
  if (
    props.option.optionCurrency === undefined ||
    props.currentlySelected
  ) return false;
  return <CurrencyStats
    currentOptions={getChildOptions(props.option, props.options)}
    currency={props.option.optionCurrency}
  />
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionCurrency);
