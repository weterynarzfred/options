import React from 'react';
import { connect } from 'react-redux';
import { clone } from '../functions/helpers';
import isOptionDisabled from '../functions/isOptionDisabled';

// calculate how much of each currency is left
function calculateCurrency(options, currentValues) {
  for (const slug in options) {
    const option = options[slug];
    if (!isOptionDisabled(option, options)) {
      if (option.type === 'option') {
        const selectedCount = option.hasIndividualChildren ?
          Object.getOwnPropertyNames(option.selected).length :
          option.selected;
        if (selectedCount > 0 && option.cost !== undefined) {
          for (const currencySlug in option.cost) {
            if (currentValues[currencySlug] === undefined) continue;
            let change = 0;
            if (typeof option.cost[currencySlug] === 'number') {
              change = option.cost[currencySlug] * selectedCount;
            }
            else if (typeof option.cost[currencySlug] === 'function') {
              for (let index = 0; index < selectedCount; index++) {
                change += option.cost[currencySlug]({option, options, index});
              }
            }
            currentValues[currencySlug].value -= change;
          }
          if (option.costIncrease !== undefined) {
            for (const currencySlug in option.costIncrease) {
              if (currentValues[currencySlug] === undefined) continue;
              currentValues[currencySlug].value -=
                option.costIncrease[currencySlug](option, options);
            }
          }
        }
      }
      currentValues = calculateCurrency(
        option.hasIndividualChildren ? option.selected : option.options,
        currentValues
      );
    }
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
