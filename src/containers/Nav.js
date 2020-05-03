import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from '../pages/CurrencyStats';
import propShapes from '../propShapes';
import Breadcrumbs from './Breadcrumbs';
import getCurrencies from '../functions/getCurrencies';
import Menu from './Menu';

function Nav(props) {
  const currentCurrencies = getCurrencies(props, props.path);

  return <div className="Nav">
    <CurrencyStats currency={currentCurrencies} />
    <Breadcrumbs />
    <Menu />
  </div>
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