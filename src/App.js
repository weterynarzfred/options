import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Stats from './components/Stats';
import OptionsContainer from './components/OptionsContainer';
import Errors from './components/Errors';
import { getOption } from './functions/getOption';
import PathLink from './components/PathLink';
import { clone } from './functions/helpers';

function currentOption(path, options) {
  return getOption(path.join('/'), options);
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
      <Errors />
      <Stats />
      <OptionsContainer
        containerOptions={currentOption(props.path, props.options).options}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options
  };
}

export default connect(mapStateToProps)(App);
