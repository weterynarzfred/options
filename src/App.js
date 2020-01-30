import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './functions/displayOptions';
import './style.css';

function App(props) {
  return (
    <div className="App">
      {displayOptions(props.options)}
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(App);
