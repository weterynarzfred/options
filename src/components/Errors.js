import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCount } from '../functions/getSelected';
import { getChildOptions } from './Option';
import { calculateCurrency } from './CurrencyStats';
import { clone } from '../functions/helpers';
import isOptionDisabled from '../functions/isOptionDisabled';

function checkGlobalCurrencies(settings, options, errors) {
  if (settings.currency === undefined) return;
  const currentValues = calculateCurrency(
    options,
    clone(settings.currency),
    options
  );
  for (const currencySlug in currentValues) {
    const currency = currentValues[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.value < min) {
      errors.push({
        text: `Currency ${currency.name} cannot be below ${min}.`,
      });
    }
  }
}

function checkMinMaxSelected(option, options, errors) {
  if (option.min === false && option.max === false) return;
  const selectedCount = getSelectedCount(option, options);
  if (option.min !== false) {
  if (selectedCount < option.min) {
    errors.push({
      text: `Option ${option.path} cannot have less than ${option.min} selected.`,
    });
  }
}
  if (option.max !== false) {
    if (selectedCount > option.max) {
      errors.push({
        text: `Option ${option.path} cannot have more than ${option.max} selected.`,
      });
    }
  }
}

function checkOptionCurrencies(option, options, errors) {
  if (option.optionCurrency === undefined) return;
  const currentValues = calculateCurrency(
    getChildOptions(option, options),
    clone(option.optionCurrency),
    options
  );
  for (const currencySlug in currentValues) {
    const currency = currentValues[currencySlug];
    let min = currency.min === undefined ? 0 : currency.min;
    if (min !== false && currency.value < min) {
      errors.push({
        text: `Currency ${currency.name} in ${option.path} cannot be below ${min}.`,
      });
    }
  }
}

function findErrors(currentOptions, options, settings) {
  const errors = [];
  if (settings !== undefined) {
    checkGlobalCurrencies(settings, options, errors);
  }
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options)) continue;
    checkMinMaxSelected(option, options, errors);
    checkOptionCurrencies(option, options, errors);
    errors.push(...findErrors(getChildOptions(option, options), options));
  }
  return errors;
}

function Errors(props) {
  const errors = [];
  errors.push(...findErrors(props.options, props.options, props.settings));
  return (
    <div className="Errors">
      {errors.map((e, i) => <div className="error" key={`error-${i}`}>
        {e.text}
      </div>)}
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Errors);
