import React from 'react';
import './styles/style.scss';
import Intro from './containers/Intro';
import OptionsContainer from './containers/OptionsContainer';
import OptionWideHead from './containers/OptionWideHead';
import getOption from './functions/getOption';
import { connect } from 'react-redux';
import Nav from './containers/Nav';

function App(props) {
  const option = getOption(props.path, props.options);
  return (
    <div className="App">
      <Nav option={option} />
      {props.path.length === 0 ?
        <Intro /> :
        <OptionWideHead option={option} />
      }
      <OptionsContainer option={option} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options,
  };
}

export default connect(mapStateToProps)(App);
