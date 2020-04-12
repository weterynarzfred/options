import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import Errors from './components/Errors';
import Breadcrumbs from './components/Breadcrumbs';
import MainOption from './components/MainOption';

function App(props) {
  return (
    <div className="App">
      <Breadcrumbs />
      <Errors />
      <Stats />
      <MainOption />
    </div>
  );
}

export default connect()(App);
