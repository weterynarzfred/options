import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from './CurrencyStats';

function Stats(props) {
  return (
    <div className="Stats">
      <div className="currency-list">
      <CurrencyStats
        options={props.options}
        currency={props.settings.currency}
      />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Stats);
