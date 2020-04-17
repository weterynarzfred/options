import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import propShapes from '../propShapes';

function IntroPage(props) {
  return <div className="Intro">
    <div className="IntroTitle title">{props.title}</div>
    <Text text={props.text} />
  </div>
}

IntroPage.propTypes = {
  title: PropTypes.node,
  text: propShapes.text,
};

export default IntroPage;