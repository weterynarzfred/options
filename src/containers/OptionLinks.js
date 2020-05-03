import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import PathLink from './PathLink';

function getOpenLink(props) {
  if (props.depth <= 1 || props.option.disableOpenButton) return false;
  return <PathLink text="open" path={props.option.path} />
}

function OptionLinks(props) {
  const openLink = getOpenLink(props);
  if (openLink === false) return false;

  return <div className="OptionLinks">
    {openLink}
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