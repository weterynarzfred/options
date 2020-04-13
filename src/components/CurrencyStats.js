import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import getChildOptions from "../functions/getChildOptions";
import calculateCurrency from './../functions/calculateCurrency';

function CurrencyStats(props) {
  const currentValues = calculateCurrency(
    props.currentOptions,
    props.currency,
    props.options
  );

  if (
    props.option !== undefined &&
    props.option.optionCurrency !== undefined
  ) {
    const optionCurrencyValues = calculateCurrency(
      getChildOptions(props.option, props.options),
      props.option.optionCurrency,
      props.options
    );
    for (const slug in optionCurrencyValues) {
      optionCurrencyValues[slug].fromOption = true;
    }
    Object.assign(currentValues, optionCurrencyValues);
  }

  const currencyArray = [];
  for (const slug in currentValues) {
    const currency = currentValues[slug];
    currencyArray.push(
      <div
        className={classNames(
          'currency',
          {currencyFromOption: currency.fromOption}
        )}
        key={`currency-${slug}`}
      >
        <div className="currency-name">{currency.name}</div>
        <div className="currency-value">{currency.value}</div>
      </div>
    );
  }

  return <div className="CurrencyStats">
    {currencyArray}
  </div>;
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(CurrencyStats);
