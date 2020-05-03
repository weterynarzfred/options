import React from 'react';
import { connect } from 'react-redux';
import PathLink from './PathLink';
import ReturnButton from '../pages/ReturnButton';
import getOption from '../functions/getOption';

function getBreadcrumbsPage(path, props) {
  if (
    path.length === 0 ||
    (props.settings.usesStages && path.length <= 1)
  ) return false;

  const breadcrumbs = [];
  for (let i = 0; i < props.path.length; i++) {
    const currentPath = props.path.slice(0, i + 1);
    const optionName = getOption(currentPath, props.options).name;
    breadcrumbs.push(
      <React.Fragment key={`breadcrumb-${currentPath.join('-')}`}>
        <PathLink path={currentPath.join('/')} text={optionName} />
        {i === props.path.length - 1 ? false : <span> / </span>}
      </React.Fragment>
    );
  }

  return <div className="BreadcrumbsPage">
    {props.settings.usesStages ? '' :
      <React.Fragment>
        <PathLink path="" text="home" />
        <span> / </span>
      </React.Fragment>
    }
    {breadcrumbs}
  </div>;
}

function Breadcrumbs(props) {
  const path = props.path.filter(e => e !== '');

  return <nav className="Breadcrumbs">
    <ReturnButton pathHistory={props.pathHistory} />
    {getBreadcrumbsPage(path, props)}
  </nav>;
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    options: state.options,
    path: state.path,
    pathHistory: state.pathHistory,
  };
}

export default connect(mapStateToProps)(Breadcrumbs);