import React from 'react';
import { connect } from 'react-redux';
import IntroPage from '../pages/IntroPage';

function Intro(props) {
  return <IntroPage
    title={props.settings.title}
    text={props.settings.intro}
  />;
}

function mapStateToProps(state) {
  return {
    path: state.path,
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Intro);