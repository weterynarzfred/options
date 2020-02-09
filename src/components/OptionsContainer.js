import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';
import Story from './Story';

function OptionsContainer(props) {
  if (props.options === undefined) return null;
  const result = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    if (option.type === 'option' || option.type === 'group') {
      result.push(<Option option={option} key={`option-${option.path}`} />);
    }
    else if (option.type === 'story') {
      result.push(<Story option={option} key={`option-${option.path}`} />);
    }
  }
  return <div className="OptionsContainer">{result}</div>;
}

export default connect()(OptionsContainer);
