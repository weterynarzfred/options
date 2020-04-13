import React from 'react';
import { connect } from 'react-redux';
import PathLink from './PathLink';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getOption } from '../functions/getOption';

function OptionLink(props) {
  if (props.option.link === undefined) return false;
  const text = <svg viewBox="0 0 100 100" className="icon-link">
    <path d="M10 90L75 25L90 50L90 10L50 10L75 25" />
  </svg>;
  const isDisabled = isOptionDisabled(getOption(props.option.link, props.options), props.options);
  return <button className="Option-link" disabled={isDisabled}>
    <PathLink
      path={props.option.link}
      text={text}
    />
  </button>
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionLink);