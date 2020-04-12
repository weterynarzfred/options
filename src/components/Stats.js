import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from './CurrencyStats';
import Errors from './Errors';
import { getErrorButton } from './Errors';
import { getOption } from '../functions/getOption';
import { clone } from '../functions/helpers';

function Stats(props) {
  return (
    <div className="Stats">
      <div className="Stats-list">
        <CurrencyStats
          option={getOption(clone(props.path), props.options)}
          currentOptions={props.options}
          currency={props.settings.currency}
        />
        {getErrorButton(props.errors)}
      </div>
      <Errors />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    options: state.options,
    settings: state.settings,
    errors: state.errors,
    path: state.path,
  };
}

export default connect(mapStateToProps)(Stats);
