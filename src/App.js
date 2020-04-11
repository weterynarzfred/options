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
    />;
  }
  return <Option option={currentOption} currentlySelected={true} />
}

function getBreadCrumbs(path) {
  path = path.filter(e => e !== '');
  const breadCrumbs = [];
  while (path.length) {
    breadCrumbs.push(
      <PathLink
        key={`breadcrumb-${path.join('-')}`}
        path={path.join('/')}
        text={path.pop()}
      />
    );
  }
  return breadCrumbs.reverse();
}

function App(props) {
  return (
    <div className="App">
      <div>
        <PathLink path="" text="home" />
        {getBreadCrumbs(clone(props.path))}
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
