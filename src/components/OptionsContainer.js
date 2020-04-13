import React from 'react';
import Option from './Option';
import Story from './Story';
import classNames from 'classnames';

function OptionsContainer(props) {
  let result = [];
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
  return <div
    className={classNames(
      'OptionsContainer',
      {MainContainer: props.isMainContainer},
    )}
  >{result}</div>;
}


export default OptionsContainer;
 