import React from 'react';
import PropTypes from 'prop-types';
import Hyphenated from 'react-hyphen';
import propShapes from '../propShapes';

function Text(props) {
  if (props.isChangeable) {
    return <div className="Text">
      <input
        value={props.text}
        onChange={event => props.change('text', event.target.value)}
      />
    </div>;
  }

  return <div className="Text">
    <Hyphenated>
      {props.text || null}
    </Hyphenated>
  </div>;
}

Text.propTypes = {
  text: propShapes.text,
  isChangeable: PropTypes.bool,
  change: PropTypes.func,
};

export default Text;