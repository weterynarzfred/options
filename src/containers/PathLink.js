import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isObject } from '../functions/helpers';

function PathLink(props) {
  return (
    <span className="PathLink" onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromLink = true;
      props.dispatch({
        type: 'CHANGE_PATH',
        path: props.path.split('/'),
        scroll: window.scrollY,
        isChangingStage: props.isChangingStage,
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
};

export default connect()(PathLink);
