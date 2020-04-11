import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import OptionsContainer from './components/OptionsContainer';
import Errors from './components/Errors';
import { getOption } from './functions/getOption';
import PathLink from './components/PathLink';
import { clone } from './functions/helpers';
import Option from './components/Option';

function getMainOption(path, options) {
  const currentOption = getOption(path.join('/'), options);
  if(currentOption.slug === undefined) {
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

function getBreadCrumbs(path, options) {
  path = path.filter(e => e !== '');
  const breadCrumbs = [];
  for (let i = 0; i < path.length; i++) {
    const currentPath = path.slice(0, i + 1);
    const optionName = getOption(currentPath, options).name;
    breadCrumbs.push(
      <React.Fragment
        key={`breadcrumb-${currentPath.reverse().join('-')}`}
      >
        <PathLink
          path={currentPath.join('/')}
          text={optionName}
        /> /&nbsp;
      </React.Fragment>);
  }
  return breadCrumbs;
}

function App(props) {
  return (
    <div className="App">
      <div className="Breadcrumbs">
        <PathLink path="" text="home" /> /&nbsp;
        {getBreadCrumbs(clone(props.path), props.options)}
      </div>
      <Errors errors={props.errors} />
      <Stats />
      {getMainOption(props.path, props.options)}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(App);
