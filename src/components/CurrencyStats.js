import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { clone } from '../functions/helpers';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getChildOptions } from './Option.js';
import { getSelectedCount } from '../functions/getSelected';

/**
 * Calculate how much of each currency is left.
 * @param {object} currentOptions Options to check.
 * @param {object} currentValues Current currency values.
 * @param {object} options Global options.
 */
export function calculateCurrency(currentOptions, currentValues, options) {
  let currentValuesClone = clone(currentValues);
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (isOptionDisabled(option, options)) continue;
    if (option.type === 'option') {
      const selectedCount = getSelectedCount(option, options);
      if (selectedCount > 0 && option.cost !== undefined) {
        for (const currencySlug in option.cost) {
          if (currentValuesClone[currencySlug] === undefined) continue;
          let change = 0;
          if (typeof option.cost[currencySlug] === 'number') {
            change = option.cost[currencySlug] * selectedCount;
          }
          else if (typeof option.cost[currencySlug] === 'function') {
            for (let index = 0; index < selectedCount; index++) {
              change += option.cost[currencySlug]({
                option,
                options,
                index,
              });
            }
          }
          currentValuesClone[currencySlug].value -= change;
        }
      }
    }

    currentValuesClone = calculateCurrency(
      getChildOptions(option, options),
      currentValuesClone,
      options
    );
  }
  return currentValuesClone;
}

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
