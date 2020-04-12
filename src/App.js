import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import Breadcrumbs from './components/Breadcrumbs';
import MainOption from './components/MainOption';

function App(props) {
  return (
    <div className="App">
      <header>
        <Breadcrumbs />
        <Stats />
      </header>
      <main>
        <MainOption />
      </main>
    </div>
  );
}

export default connect()(App);
