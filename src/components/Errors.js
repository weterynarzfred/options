import React from 'react';
import { connect } from 'react-redux';

function findErrors(options) {
  
}

function Errors(props) {
  return (
    <div className="Errors">
      error list
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Errors);
