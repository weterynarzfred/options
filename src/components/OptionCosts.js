import React from 'react';
import { connect } from 'react-redux';

function OptionCosts(props) {
  const option = props.option;
  if (option.type !== 'option') return null;
  if (option.cost === undefined) return null;
  const costs = [];
  for (const currencySlug in option.cost) {
    if (props.settings.currency[currencySlug] === undefined) continue;
    const currencyName = props.settings.currency[currencySlug].name;
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
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(OptionCosts);
