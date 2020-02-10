import React from 'react';
import { connect } from 'react-redux';
import Option from './Option';
import Story from './Story';
import { getOption } from '../functions/helpers';
import getSyntheticOptions from '../functions/getSyntheticOptions';

function OptionsContainer(props) {
  if (props.containerOptions === undefined) return null;
  const result = [];
  let options = props.containerOptions;
  const parentOption = getOption(props.path, props.options);
  if (parentOption && parentOption.optionsFunction !== undefined) {
    options = getSyntheticOptions(parentOption, props.options);
  }
  for (const slug in options) {
    const option = options[slug];
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
