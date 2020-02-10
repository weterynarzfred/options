import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import OptionsContainer from './components/OptionsContainer';

function App(props) {
  return (
    <div className="App">
      <Stats />
      <OptionsContainer
        containerOptions={props.options}
        path = ""
        functionalChildren={{}}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {options: state.options};
}

export default connect(mapStateToProps)(App);
