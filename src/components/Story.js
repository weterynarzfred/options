import React from 'react';
import { connect } from 'react-redux';
import Hyphenated from 'react-hyphen';

function Story(props) {
  const option = props.option;
  return <div className="Story">
    <div className="text">
      <div className="Story-title">{option.name}</div>
      <Hyphenated>
        {option.text}
      </Hyphenated>
    </div>
  </div>;
}

export default connect()(Story);
