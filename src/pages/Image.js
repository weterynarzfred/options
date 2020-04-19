import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Image(props) {
  return <div
    className={classNames(
      'Image',
      { ImageFloating: props.floating },
      { ImageHorizontal: props.horizontal }
    )}
  >
    <div className="ImageContent"
      style={{
        backgroundImage: `url(${props.src})`,
      }}
    ></div>
  </div>
}

Image.propTypes = {
  src: PropTypes.string,
  floating: PropTypes.bool,
  horizontal: PropTypes.bool,
};

export default Image;