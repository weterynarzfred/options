import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './functions/displayOptions';
import './style.scss';
import Stats from './components/Stats';

function App(props) {
  return (
    <div className="App">
      <Stats />
      {displayOptions(props.options)}
    </div>
  );
}

function mapStateToProps(state) {
  return {options: state.options};
}

export default connect(mapStateToProps)(App);
