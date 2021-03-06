import React from 'react';
import PropTypes from 'prop-types';
import Hyphenated from 'react-hyphen';
import propShapes from '../propShapes';

function Text(props) {
  if (props.isChangeable) {
    return <div className="Text">
      <textarea
        value={props.text}
        onChange={event => props.change('text', event.target.value)}
        placeholder="description"
      />
    </div>;
  }

  if (!props.text) return false;

  return <div className="Text">
    <Hyphenated>
      {props.text}
    </Hyphenated>
  </div>;
}

Text.propTypes = {
  text: propShapes.text,
  isChangeable: PropTypes.bool,
  change: PropTypes.func,
};

export default Text;