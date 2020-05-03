import React from 'react';
import PropTypes from 'prop-types';
import PathLink from '../containers/PathLink';

function NextStage(props) {
  const text = props.text === undefined ?
    'Preceed to the next stage' : props.text;

  return <div className="NextStage">
    <PathLink
      path={props.target}
      text={text}
      isChangingStage={true}
    />
  </div>;
}

NextStage.propTypes = {
  target: PropTypes.string,
};

export default NextStage;