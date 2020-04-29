import React from 'react';
import { connect } from 'react-redux';
import IntroPage from '../pages/IntroPage';

function Intro(props) {
  return <IntroPage
    title={props.settings.title}
    text={props.settings.intro}
    image={props.settings.introImage}
  />;
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Intro);