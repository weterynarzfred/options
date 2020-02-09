import React from 'react';
import { connect } from 'react-redux';
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import CurrencyStats from './CurrencyStats';
import OptionsContainer from './OptionsContainer';
import classNames from 'classnames';
import isOptionDisabled from './../functions/isOptionDisabled';

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
    <div className={classNames(
      'Option',
      {disabled: isOptionDisabled(props.option, props)}
    )}>
      <div className="Option-stats">
        {displayOptionCurrency(props)}
        <OptionCosts option={props.option}/>
      </div>
      <div className="Option-name">
        {props.option.name}
      </div>
      <OptionControls option={props.option} />
      <OptionsContainer
        options={
          props.option.hasIndividualChildren ?
            props.option.selected :
            props.option.options
        }
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
