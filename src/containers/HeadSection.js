import React from 'react';
import { connect } from 'react-redux';
import TitleSection from '../pages/TitleSection';

function HeadSection(props) {
  if (props.path.length === 0) {
    return <TitleSection
      title={props.settings.title}
      text={props.settings.intro}
    />
  }
  else {
    return <p>Not yet implemented</p>
  }
}

function mapStateToProps(state) {
  return {
    path: state.path,
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(HeadSection);