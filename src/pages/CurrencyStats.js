import React from 'react';
import classNames from 'classnames';
import propShapes from '../propShapes';

function CurrencyStats(props) {
  if (props.currency === undefined) return false;
  const currencies = [];
  for (const currencySlug in props.currency) {
    const currency = props.currency[currencySlug];
    currencies.push(
      <div className={
        classNames(
          'CurrencyStatSingle',
          { CurrencyStatPositive: currency.currentValue >= 0 }
        )}
        key={`currency-${currencySlug}`}>
        <div className="CurrencyStats-name">{currency.name}</div>
        <div className="CurrencyStats-value">{currency.currentValue}</div>
      </div>
    );
  }
  return <div className="CurrencyStats">
    {currencies}
  </div>
}

CurrencyStats.propTypes = {
  currency: propShapes.currency,
};

export default CurrencyStats;