import React from 'react';
import { connect } from 'react-redux';
import getOption from '../functions/getOption';
import PathLink from './PathLink';

function Breadcrumbs(props) {
  const path = props.path.filter(e => e !== '');
  const breadCrumbs = [];
  for (let i = 0; i < path.length; i++) {
    const currentPath = path.slice(0, i + 1);
    const optionName = getOption(currentPath, props.options).name;
    breadCrumbs.push(
      <React.Fragment key={`breadcrumb-${currentPath.reverse().join('-')}`}>
        <PathLink path={currentPath.join('/')} text={optionName} /> /&nbsp;
      </React.Fragment>
    );
  }
  return <div className="Breadcrumbs">
    <PathLink path="" text="home" /> /&nbsp;
    {breadCrumbs}
  </div>;
}

function mapStateToProps(state) {
  return {
    path: state.path,
    options: state.options,
  };
}

export default connect(mapStateToProps)(Breadcrumbs);