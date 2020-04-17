import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';
import CurrencyStats from '../pages/CurrencyStats';

function Nav(props) {
  return <nav>
    <Breadcrumbs />
    <CurrencyStats currency={props.settings.currency} />
  </nav>
}

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path,
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Nav);