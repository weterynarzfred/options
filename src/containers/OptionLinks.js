import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import PathLink from './PathLink';
import getOption from '../functions/getOption';

function getOpenLink(props) {
  if (
    props.isOpened ||
    props.depth <= 1 ||
    props.option.disableOpenButton
  ) return false;
  return <PathLink text="open" path={props.option.path} />
}

function getOptionLink(props) {
  if (props.option.link === undefined) return false;
  const target = getOption(props.option.link, props.options);
  return <PathLink text={`open ${target.name}`} path={target.path} />
}

function OptionLinks(props) {
  const openLink = getOpenLink(props);
  const optionLink = getOptionLink(props);
  if (
    openLink === false &&
    optionLink === false
  ) return false;

  return <div className="OptionLinks">
    {optionLink}
    {openLink}
  </div>
}

OptionLinks.propTypes = {
  option: propShapes.option,
  depth: PropTypes.number,
  isOpened: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionLinks);