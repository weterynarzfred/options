import React from 'react';
import { connect } from 'react-redux';

function Story(props) {
  const option = props.option;
  return <div className="Story">
    <div className="text">
      <div className="Story-title">{option.name}</div>
      {option.text}
    </div>
  </div>;
}

export default connect()(Story);
