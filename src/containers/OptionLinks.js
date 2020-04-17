import React from 'react';
import propShapes from '../propShapes';
import getSubptions from '../functions/getSubptions';
import PathLink from './PathLink';
import { connect } from 'react-redux';

function getOpenLink(props) {
  const suboptions = getSubptions(props.option, props.options, true);
  if (Object.keys(suboptions).length > 0) {
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
};

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionLinks);