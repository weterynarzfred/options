import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';

function Nav(props) {
  return <nav>
    <Breadcrumbs />
  </nav>
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options,
  };
}

export default connect(mapStateToProps)(Nav);