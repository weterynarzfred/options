import React from 'react';
import { connect } from 'react-redux';
import { clone } from '../functions/helpers';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getChildOptions } from './Option.js';
import { getSelectedCount } from '../functions/getSelected';

// calculate how much of each currency is left
export function calculateCurrency(currentOptions, currentValues, options) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (!isOptionDisabled(option, options)) {
      if (option.type === 'option') {
        const selectedCount = getSelectedCount(option, options);
        if (selectedCount > 0 && option.cost !== undefined) {
          for (const currencySlug in option.cost) {
            if (currentValues[currencySlug] === undefined) continue;
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
            currentValues[currencySlug].value -= change;
          }
        }
      }

      currentValues = calculateCurrency(
        getChildOptions(option, options),
        currentValues,
        options
      );
    }
  }
  return currentValues;
}

function CurrencyStats(props) {
  const currentValues = calculateCurrency(
    props.currentOptions,
    clone(props.currency),
    props.options
  );
  const currencyArray = [];
  for (const slug in currentValues) {
    const currency = currentValues[slug];
    currencyArray.push(
      <div className="currency" key={`currency-${slug}`}>
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
  return {...state};
}

export default connect(mapStateToProps)(CurrencyStats);
