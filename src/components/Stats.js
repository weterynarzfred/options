import React from 'react';
import { connect } from 'react-redux';
import { clone } from '../functions/helpers';

function calculateCurrency(options, currentValues) {
  for (const slug in options) {
    const option = options[slug];
    if (option.type === 'option') {
      const selectedCount = option.hasIndividualChildren ? option.selected.length : option.selected;
      if (selectedCount > 0) {
        if (option.cost !== undefined) {
          for (const currencySlug in option.cost) {
            const value = option.cost[currencySlug];
            if (currentValues[currencySlug] !== undefined) {
              currentValues[currencySlug].value -= value * selectedCount;
            }
          }
        }
      }
    }
    if (option.hasIndividualChildren) {
      if (option.selected) {
        currentValues = calculateCurrency(option.selected, currentValues);
      }
    }
    else {
      if (option.options) {
        currentValues = calculateCurrency(option.options, currentValues);
      }
    }
  }
  return currentValues;
}

function displayCurrency(props) {
  const currentValues = calculateCurrency(props.options, clone(props.settings.currency));
  const currencyArray = [];
  for (const slug in currentValues) {
    const currency = currentValues[slug];
    currencyArray.push(<div className="currency" key={`currency-${slug}`}>
  <div className="currency-name">{currency.name}</div>
  <div className="currency-value">{currency.value}</div>
    </div>);
  }

  return currencyArray;
}

function Stats(props) {
  return (
    <div className="Stats">
      <div className="currency-list">
        {displayCurrency(props)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Stats);
