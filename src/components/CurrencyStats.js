import React from 'react';
import { connect } from 'react-redux';
import { clone } from '../functions/helpers';
import isOptionDisabled from '../functions/isOptionDisabled';
import getSyntheticOptions from '../functions/getSyntheticOptions';

// calculate how much of each currency is left
function calculateCurrency(currentOptions, currentValues, options) {
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (!isOptionDisabled(option, currentOptions)) {
      if (option.type === 'option') {
        let selectedCount = 0;
        if (option.hasIndividualChildren) {
          selectedCount = Object.getOwnPropertyNames(option.selected).length
        }
        else {
          selectedCount = option.selected;
        }
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
                  index
                });
              }
            }
            currentValues[currencySlug].value -= change;
          }
        }
      }

      if (option.hasIndividualChildren) {
        currentValues = calculateCurrency(option.selected, currentValues, options);
      }
      else if (option.optionsFunction !== undefined) {
        const syntheticOptions = getSyntheticOptions(option, options);
        currentValues = calculateCurrency(syntheticOptions, currentValues, options);
      }
      else {
        currentValues = calculateCurrency(option.options, currentValues, options);
      }
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
