import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import propShapes from '../propShapes';
import Image from './Image';

function IntroPage(props) {
  return <div className="Intro">
    <Image src={props.image} floating={true} />
    <div className="main-column">
      <div className="IntroTitle title">{props.title}</div>
      <Text text={props.text} />
    </div>
  </div>
}

IntroPage.propTypes = {
  title: PropTypes.node,
  text: propShapes.text,
};

export default IntroPage;