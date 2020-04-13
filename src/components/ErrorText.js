import React from 'react';
import PathLink from './PathLink';

function ErrorText(props) {
  let text = props.text;
  if (props.path !== undefined) {
    text = <PathLink
      path={props.path}
      text={text}
    />;
  }
return <div className="ErrorText error">{text}</div>;
}

export default ErrorText;