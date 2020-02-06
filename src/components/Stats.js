import React from 'react';
import { connect } from 'react-redux';

function displayStats(props) {
  const currencyArray = [];
  for (const slug in props.settings.currency) {
    const currency = props.settings.currency[slug];
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
        {displayStats(props)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Stats);
