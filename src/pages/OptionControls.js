import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Spinbox from './Spinbox';
import propShapes from '../propShapes';
import AddChild from './AddChild';
import { isObject } from '../functions/helpers';
import Delete from './Delete';
import SelectControls from './SelectControls';

function OptionControls(props) {
  if (props.option.info.isDisabled) return false;
  let controls;
  switch (props.optionInfo.controlType) {
    case 'checkbox':
      controls = <Checkbox
        selected={!!props.option.selected}
        sell={props.sell.bind(null, props.option)}
        buy={props.buy.bind(null, props.option)}
      />;
      break;
    case 'spinbox':
      controls = <Spinbox
        selected={props.option.selected}
        sell={props.sell.bind(null, props.option)}
        buy={props.buy.bind(null, props.option)}
        trade={props.trade.bind(null, props.option)}
        min={props.option.min}
        max={props.option.max}
      />
      break;
    case 'addChild':
      controls = <AddChild buy={props.buy.bind(null, props.option)} />;
      break;
    case 'delete':
      controls = <Delete sell={props.sell.bind(null, props.option)} />;
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
