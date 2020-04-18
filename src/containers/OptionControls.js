import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../pages/Checkbox';
import getControlType from '../functions/getControlType';
import Spinbox from '../pages/Spinbox';
import propShapes from '../propShapes';
import AddChild from '../pages/AddChild';
import { isObject } from '../functions/helpers';
import Delete from '../pages/Delete';

function OptionControls(props) {
  let controls;
  switch (getControlType(props.option)) {
    case 'checkbox':
      controls = <Checkbox
        selected={!!props.option.selected}
        sell={props.sell}
        buy={props.buy}
      />;
      break;
    case 'spinbox':
      controls = <Spinbox
        selected={props.option.selected}
        sell={props.sell}
        buy={props.buy}
      />
      break;
    case 'addChild':
      controls = <AddChild buy={props.buy} />;
      break;
    case 'delete':
      controls = <Delete sell={props.sell} />;
      break;
    default:
      controls = false;
  }

  return <div
    className="OptionControls"
    onClick={event => {
      if (!isObject(event.detail)) event.detail = {};
      event.detail.fromOptionControl = true;
    }}
  >
    {controls}
  </div>
}

OptionControls.propTypes = {
  option: propShapes.option,
  sell: PropTypes.func,
  buy: PropTypes.func,
};

export default OptionControls;