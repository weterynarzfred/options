import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import PathLink from './PathLink';
import NextStage from './NextStage';

function getOpenLink(props) {
  if (props.depth <= 1 || props.option.disableOpenButton) return false;
  return <PathLink text="open" path={props.option.path} />
}

function getNextStageLink(props) {
  if (!props.option.includeNextStage) return false;
  return <NextStage target={props.option.includeNextStage} />
}

function OptionLinks(props) {
  const openLink = getOpenLink(props);
  const nextStageLink = getNextStageLink(props);
  if (
    openLink === false &&
    nextStageLink === false
  ) return false;

  return <div className="OptionLinks">
    {openLink}
    {nextStageLink}
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