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
    currentOptions={getChildOptions(option, props.options)}
    currency={option.optionCurrency}
  />
}

export function getChildOptions(option, options) {
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

function getOpenButton(props) {
  if (props.currentlySelected) return;
  return <button className="Option-open" onClick={() => props.dispatch({
    type: 'CHANGE_PATH',
    path: props.option.path.split('/'),
  })}>open</button>;
}

function getOptionText(props) {
  if (typeof props.option.text === 'function') return props.option.text({
    option: props.option,
    options: props.options,
  });
  return props.option.text;
}

function getErrors(props) {
  return props.errors.filter(error => error.path === props.option.path)
    .map((e, i) => (
      <div className="error" key={`option-error-${i}`}>
        {e.text}
      </div>
    ));
}

function getContent(disabled, props) {
  if (disabled) return null;
  return <React.Fragment>
    <div className="Option-text">
      {getOptionText(props)}
    </div>
    <OptionControls option={props.option} />
    <OptionsContainer
      containerOptions={getChildOptions(props.option, props.options)}
    />
    {getOpenButton(props)}
    {getErrors(props)}
  </React.Fragment>;
}

function Option(props) {
  const disabled = isOptionDisabled(props.option, props.options);

  return (
    <div className={classNames(
      'Option',
      {disabled}
    )}>
      <div className="Option-stats">
        {displayOptionCurrency(props)}
        <OptionCosts option={props.option}/>
      </div>
      <div className="Option-name">
        {props.option.name}
      </div>
      {getContent(disabled, props)}
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
