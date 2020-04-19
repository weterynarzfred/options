import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../pages/Checkbox';
import getControlType from '../functions/getControlType';
import Spinbox from '../pages/Spinbox';
import propShapes from '../propShapes';
import AddChild from '../pages/AddChild';
import { isObject } from '../functions/helpers';
import Delete from '../pages/Delete';
import SelectControls from './../pages/SelectControls';

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
        trade={props.trade}
        min={props.option.min}
        max={props.option.max}
      />
      break;
    case 'addChild':
      controls = <AddChild buy={props.buy} />;
      break;
    case 'delete':
      controls = <Delete sell={props.sell} />;
      break;
    case 'select':
      controls = <SelectControls
        selectedId={props.optionInfo.selectedSuboptionId}
        selectable={props.optionInfo.selectableSuboptions}
        sell={props.sell}
        buy={props.buy}
        includeEmpty={props.option.min === 0}
      />;
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
  trade: PropTypes.func,
  optionInfo: PropTypes.object,
};

export default OptionControls;