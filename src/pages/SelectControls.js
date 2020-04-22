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

  if (props.selectedId < props.selectable.length - 1) {
    props.buy(props.selectable[props.selectedId + 1]);
  }
  else if (!props.includeEmpty) {
    props.buy(props.selectable[0]);
  }
  else {
    props.sell(props.selectable[props.selectedId]);
  }
}

function handlePrevClick(props, event) {
  if (!isObject(event.detail)) event.detail = {};
  event.detail.fromOptionControl = true;

  if (props.selectedId === undefined) {
    props.buy(props.selectable[props.selectable.length - 1]);
    return;
  }

  if (props.selectedId > 0) {
    props.buy(props.selectable[props.selectedId - 1]);
  }
  else if (!props.includeEmpty) {
    props.buy(props.selectable[props.selectable.length - 1]);
  }
  else {
    props.sell(props.selectable[props.selectedId]);
  }
}

function SelectControls(props) {
  let name = 'none';
  if (props.selectedId !== undefined) {
    name = props.selectable[props.selectedId].name;
  }

  return <div className="SelectControls">
    <button onClick={handlePrevClick.bind(null, props)}>
      <svg viewBox="0 0 100 100">
        <path d="M70 10L10 50L70 90z" />
      </svg>
    </button>
    <div className="SelectControlsCurrent">{name}</div>
    <button onClick={handleNextClick.bind(null, props)}>
      <svg viewBox="0 0 100 100">
        <path d="M30 10L90 50L30 90z" />
      </svg>
    </button>
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