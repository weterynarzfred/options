import React from 'react';
import { connect } from 'react-redux';
import Hyphenated from 'react-hyphen';

function OptionText(props) {
  let text;
  if (typeof props.option.text === 'function') {
    text = props.option.text({
      option: props.option,
      options: props.options,
    });
  }
  else {
    text = props.option.text;
  }

  return <Hyphenated>
    <div className="Option-text text">
      {text}
    </div>
  </Hyphenated>
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionText);
