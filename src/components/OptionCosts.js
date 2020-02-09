import React from 'react';
import { connect } from 'react-redux';
import { getOption, clone } from '../functions/helpers';

function getCurrencies(props, path) {
  const currencies = clone(props.settings.currency);
  path = path.split('/').reverse();
  let currentPath = path.pop();
  while (path.length > 0) {
    currentPath += '/' + path.pop();
    const option = getOption(currentPath, props.options);
    if (option.optionCurrency !== undefined) {
      Object.assign(currencies, option.optionCurrency);
    }
  }
  return currencies;
}

function OptionCosts(props) {
  const option = props.option;
  if (option.type !== 'option') return null;
  if (option.cost === undefined) return null;
  const costs = [];
  const currencies = getCurrencies(props, option.path);

  for (const currencySlug in option.cost) {
    if (currencies[currencySlug] === undefined) continue;
    const currencyName = currencies[currencySlug].name;
    const cost = option.cost[currencySlug];
    costs.push(
      <div
        className="Option-cost currency"
        key={`option-${option.path}-cost-${currencySlug}`}
      >
        <div className="currency-name">{currencyName}</div>
        <div className="currency-value">{cost}</div>
      </div>
    );
  }

  return <div className="OptionCosts">{costs}</div>;
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(OptionCosts);
