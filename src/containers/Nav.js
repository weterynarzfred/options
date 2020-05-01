import React from 'react';
import { connect } from 'react-redux';
import CurrencyStats from '../pages/CurrencyStats';
import propShapes from '../propShapes';
import getCurrencies from '../functions/getCurrencies';
import Menu from './Menu';

function Nav(props) {
  const currentCurrencies = getCurrencies(props, props.path);

  return <div className="Nav">
    <CurrencyStats currency={currentCurrencies} />
    <Menu />
  </div>
}

Nav.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path.map(e => e.slug),
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Nav);