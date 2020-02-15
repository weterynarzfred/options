import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';
import Story from './Story';

function OptionsContainer(props) {
  const result = [];
  let currentOptions = props.containerOptions;
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (option.type === 'option' || option.type === 'group') {
      result.push(<Option option={option} key={`option-${option.path}`} />);
    }
    else if (option.type === 'story') {
      result.push(<Story option={option} key={`option-${option.path}`} />);
    }
  }
  return <div className="OptionsContainer">{result}</div>;
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(OptionsContainer);
 