import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getOption } from '../functions/getOption';
import { clone } from '../functions/helpers';

// get all currencies current option can have
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
    let cost = 0;
    if (typeof option.cost[currencySlug] === 'number') {
      cost = option.cost[currencySlug];
    }
    else if (typeof option.cost[currencySlug] === 'function') {
      const selectedCount = option.hasIndividualChildren ?
        Object.getOwnPropertyNames(option.selected).length :
        option.selected;
      cost += option.cost[currencySlug]({
        option,
        options: props.options,
        index: selectedCount
      });
    }
    costs.push(
      <div
        className={classNames(
          'Option-cost',
          'currency',
          {positive: cost < 0}
        )}
        key={`option-${option.path}-cost-${currencySlug}`}
      >
        <div className="currency-name">{currencyName}</div>
        <div className="currency-value">{(cost > 0 ? '' : '+') + (-cost)}</div>
      </div>
    );
  }

  return <div className="OptionCosts">{costs}</div>;
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(OptionCosts);
