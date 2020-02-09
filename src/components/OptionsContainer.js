import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';

function OptionsContainer(props) {
  if (props.options === undefined) return null;
  const result = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    result.push(<Option option={option} key={`option-${option.path}`} />);
  }
  return <div className="OptionsContainer">{result}</div>;
}

export default connect()(OptionsContainer);
