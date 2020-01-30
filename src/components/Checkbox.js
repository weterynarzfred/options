import React from 'react';
import { connect } from 'react-redux';

function Checkbox(props) {
  return (
    <div className="Checkbox">
      <input
        type="checkbox"
        checked={props.selected}
        onChange={props.handleSelect}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Checkbox);
