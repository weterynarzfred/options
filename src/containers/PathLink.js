import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isObject } from '../functions/helpers';

function PathLink(props) {
  let path, anchor;
  if (props.path !== undefined) {
    [path, anchor] = props.path.split('#');
    path = path.split('/');
  }
  return (
    <span className="PathLink" onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromLink = true;
      props.dispatch({
        type: 'CHANGE_PATH',
        path,
        anchor,
        scroll: window.scrollY,
        isChangingStage: props.isChangingStage,
        previous: props.previous,
      });
    }}>
      {props.text}
    </span>
  );
}

PathLink.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  path: PropTypes.string,
  isChangingStage: PropTypes.bool,
  previous: PropTypes.bool,
};

export default connect()(PathLink);
