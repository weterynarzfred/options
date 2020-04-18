import React from 'react';
import PropTypes from 'prop-types';
import propShapes from './../propShapes';
import { isObject } from '../functions/helpers';

function handleNextClick(props, event) {
  if (!isObject(event.detail)) event.detail = {};
  event.detail.fromOptionControl = true;

  if (props.selectedId === undefined) {
    props.buy(props.selectable[0]);
    return;
  }

  props.sell(props.selectable[props.selectedId]);
  if (props.selectedId < props.selectable.length - 1) {
    props.buy(props.selectable[props.selectedId + 1]);
  }
  else if (!props.includeEmpty) {
    props.buy(props.selectable[0]);
  }
}

function handlePrevClick(props, event) {
  if (!isObject(event.detail)) event.detail = {};
  event.detail.fromOptionControl = true;

  if (props.selectedId === undefined) {
    props.buy(props.selectable[props.selectable.length - 1]);
    return;
  }

  props.sell(props.selectable[props.selectedId]);
  if (props.selectedId > 0) {
    props.buy(props.selectable[props.selectedId - 1]);
  }
  else if (!props.includeEmpty) {
    props.buy(props.selectable[props.selectable.length - 1]);
  }
}

function SelectControls(props) {
  let name = 'none';
  if (props.selectedId !== undefined) {
    name = props.selectable[props.selectedId].name;
  }

  return <div className="Spinbox">
    <button onClick={handlePrevClick.bind(null, props)}>prev</button>
    current: {name}
    <button onClick={handleNextClick.bind(null, props)}>next</button>
  </div>
}

SelectControls.propTypes = {
  selectedId: PropTypes.number,
  selectable: PropTypes.arrayOf(propShapes.option),
  sell: PropTypes.func,
  buy: PropTypes.func,
  includeEmpty: PropTypes.bool,
};

export default SelectControls;