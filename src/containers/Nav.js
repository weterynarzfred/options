import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';
import CurrencyStats from '../pages/CurrencyStats';
import propShapes from '../propShapes';
import getCurrencies from '../functions/getCurrencies';

function Nav(props) {
  const currentCurrencies = getCurrencies(props, props.path);

  return <nav>
    <Breadcrumbs />
    <CurrencyStats currency={currentCurrencies} />
  </nav>
}

Nav.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path,
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Nav);