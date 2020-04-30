import React from 'react';
import PropTypes from 'prop-types';

function Image(props) {
  if (props.src === undefined) return false;

  return <div className="Image">
    <div className="ImageContent"
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundPositionY: (props.cy === undefined ? 50 : props.cy) + '%',
        backgroundPositionX: (props.cx === undefined ? 50 : props.cx) + '%',
      }}
    ></div>
  </div>
}

Image.propTypes = {
  src: PropTypes.string,
  cx: PropTypes.number,
  cy: PropTypes.number,
};

export default Image;