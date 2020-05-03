import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function handleClick(state) {
  this.dispatch({
    type: 'CHANGE_SUMMARY_MODE',
    state,
  });
}

function EnterSummaryMode(props) {
  const text = props.text === undefined ?
    'Open summary' : props.text;

  return <div
    className="EnterSummaryMode"
    onClick={handleClick.bind(props, props.state)}
  >
    {text}
  </div>;
}

EnterSummaryMode.propTypes = {
  state: PropTypes.bool,
};

export default connect()(EnterSummaryMode);