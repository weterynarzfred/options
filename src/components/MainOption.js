import React from 'react';
import { connect } from 'react-redux';
import getOption from '../functions/getOption';
import OptionsContainer from './OptionsContainer';
import Option from './Option';

function MainOption(props) {
  const currentOption = getOption(props.path.join('/'), props.options);
  if (currentOption.slug === undefined) {
    return <OptionsContainer
      openedOption={currentOption}
      containerOptions={currentOption.options}
      isMainContainer={true}
    />;
  }
  return <Option
    option={currentOption}
    currentlySelected={true}
  />
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options,
  };
}

export default connect(mapStateToProps)(MainOption);