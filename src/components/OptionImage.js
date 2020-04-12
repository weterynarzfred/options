import React from 'react';
import { connect } from "react-redux";

function OptionImage(props) {
  if (props.option.image === undefined) return false;
  return <div
    className="Option-image"
    style={{
      backgroundImage: `url(${props.option.image})`,
    }}
  ></div>
}

export default connect()(OptionImage);