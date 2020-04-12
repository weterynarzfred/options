import React from 'react';
import { connect } from 'react-redux';

function OptionName(props) {
  if (props.option.isChild) {
    return <div className="Option-name">
      <input
        value={props.option.name}
        onChange={event => {
          props.dispatch({
            type: 'RENAME_CHILD',
            option: props.option,
            name: event.target.value,
          });
        }}
      />
    </div>
  }
  return <div className="Option-name">
    {props.option.name}
  </div>;
}

export default connect()(OptionName);
