import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PathLink from './PathLink';
import SelectedOptions from './selectedOptions';

function Menu(props) {
  const [opened, setOpened] = useState(false);

  const errors = [];
  for (const error of props.errors) {
    errors.push(<div className="error" key={`error-${error.code}`}>
      {error.path === undefined ? error.text :
        <PathLink text={error.text} path={error.path} />}
    </div>);
  }


  return <div className={classNames(
    'Menu',
    { MenuOpened: opened },
  )}>
    <div className="burger" onClick={() => setOpened(!opened)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="MenuWrap">
      {errors.length > 0 ? <React.Fragment>
        <div className="MenuHeading">Errors</div>
        {errors}
      </React.Fragment> : ''}
      <div className="MenuHeading">Your options</div>
      <SelectedOptions />
    </div>
  </div>
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Menu);