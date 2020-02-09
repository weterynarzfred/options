import React from 'react';
import { connect } from 'react-redux';
import { clone } from '../functions/helpers';

function calculateCurrency(options, currentValues) {
  for (const slug in options) {
    const option = options[slug];
    if (option.type === 'option') {
      const selectedCount = option.hasIndividualChildren ?
        option.selected.length :
        option.selected;
      if (selectedCount > 0 && option.cost !== undefined) {
        for (const currencySlug in option.cost) {
          if (currentValues[currencySlug] !== undefined) {
            currentValues[currencySlug].value -=
              option.cost[currencySlug] * selectedCount;
          }
        }
      }
    }
    currentValues = calculateCurrency(
      option.hasIndividualChildren ? option.selected : option.options,
      currentValues
    );
  }
  return currentValues;
}

function CurrencyStats(props) {
  const currentValues = calculateCurrency(
    props.options,
    clone(props.currency)
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

// function mapStateToProps(state) {
//   return {settings: state.settings};
// }

export default connect()(CurrencyStats);
