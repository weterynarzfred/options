import React from 'react';
import { connect } from 'react-redux';
import getOption from '../functions/getOption';
import PathLink from './PathLink';

function Breadcrumbs(props) {
  const path = props.path.filter(e => e !== '');
  if (
    path.length === 0 ||
    (props.settings.usesStages && path.length <= 1)
  ) return false;
  const breadCrumbs = [];
  for (let i = 0; i < path.length; i++) {
    const currentPath = path.slice(0, i + 1);
    const optionName = getOption(currentPath, props.options).name;
    breadCrumbs.push(
      <React.Fragment key={`breadcrumb-${currentPath.join('-')}`}>
        <PathLink path={currentPath.join('/')} text={optionName} />
        {i === path.length - 1 ? false : <span> / </span>}
      </React.Fragment>
    );
  }
  return <nav className="Breadcrumbs">
    {props.settings.usesStages ? '' :
      <React.Fragment>
        <PathLink path="" text="home" />
        <span> / </span>
      </React.Fragment>
    }
    {breadCrumbs}
  </nav>;
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(Breadcrumbs);