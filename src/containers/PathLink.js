import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isObject } from '../functions/helpers';

function PathLink(props) {
  return (
    <div className="PathLink" onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromLink = true;
      props.dispatch({
        type: 'CHANGE_PATH',
        path: props.path === undefined ? props.path : props.path.split('/'),
        scroll: window.scrollY,
        isChangingStage: props.isChangingStage,
        previous: props.previous,
      });
    }}>
      {props.text}
    </div>
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
