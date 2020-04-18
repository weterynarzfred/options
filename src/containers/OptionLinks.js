import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import PathLink from './PathLink';

function getOpenLink(props) {
  if (props.depth > 0) {
    return <PathLink text="open" path={props.option.path} />
  }
  else return false;
}

function OptionLinks(props) {
  return <div className="OptionLinks">
    {getOpenLink(props)}
  </div>
}

OptionLinks.propTypes = {
  option: propShapes.option,
  depth: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionLinks);