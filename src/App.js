import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import OptionsContainer from './components/OptionsContainer';
import Errors from './components/Errors';

function App(props) {
  return (
    <div className="App">
      <Stats />
      <Errors />
      <OptionsContainer
        containerOptions={props.options}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {options: state.options};
}

export default connect(mapStateToProps)(App);
