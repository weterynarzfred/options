import React from 'react';
import { connect } from 'react-redux';
import Hyphenated from 'react-hyphen';

function getStoryText(props) {
  if (typeof props.option.text === 'function') return props.option.text({
    option: props.option,
    options: props.options,
  });
  return props.option.text;
}

function Story(props) {
  const option = props.option;
  return <div className="Story">
    <div className="text">
      <div className="Story-title">{option.name}</div>
      <Hyphenated>
        {getStoryText(props)}
      </Hyphenated>
    </div>
  </div>;
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(Story);
