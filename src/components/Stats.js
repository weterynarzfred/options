import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from './CurrencyStats';

function Stats(props) {
  return (
    <div className="Stats">
      <div className="currency-list">
      <CurrencyStats
        currentOptions={props.options}
        currency={props.settings.currency}
      />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    options: state.options,
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Stats);
