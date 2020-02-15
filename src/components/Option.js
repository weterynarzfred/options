import React from 'react';
import { connect } from 'react-redux';
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import CurrencyStats from './CurrencyStats';
import OptionsContainer from './OptionsContainer';
import classNames from 'classnames';
import isOptionDisabled from '../functions/isOptionDisabled';
import getSyntheticOptions from '../functions/getSyntheticOptions';

function displayOptionCurrency(props) {
  const option = props.option;
  if (option.optionCurrency === undefined) return null;
  return <CurrencyStats
    currentOptions={option.hasIndividualChildren ? option.selected : option.options}
    currency={option.optionCurrency}
  />
}

function getChildOptions(option, options) {
  if (option.hasIndividualChildren) {
    return option.selected;
  }
  else if (option.optionsFunction !== undefined) {
    return getSyntheticOptions(option, options)
  }
  else {
    return option.options;
  }
}

function Option(props) {
  return (
    <div className={classNames(
      'Option',
      {disabled: isOptionDisabled(props.option, props.options)}
    )}>
      <div className="Option-stats">
        {displayOptionCurrency(props)}
        <OptionCosts option={props.option}/>
      </div>
      <div className="Option-name">
        {props.option.name}
      </div>
      <div className="Option-text">
        {props.option.text}
      </div>
      <OptionControls option={props.option} />
      <OptionsContainer
        containerOptions={getChildOptions(props.option, props.options)}
        path={props.path}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
