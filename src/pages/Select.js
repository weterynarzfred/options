import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import propShapes from './../propShapes';
import Name from './Name';
import Text from './Text';

function Select(props) {
  if (props.optionInfo.controlType !== 'select') return false;

  const selected = props.optionInfo.selectableSuboptions[props.optionInfo.selectedSuboptionId];
  if (selected === undefined) return false;

  let text = selected.text;
  if (selected.info.isDisabled) {
    text = selected.disabledText;
  }

  return <div className={classNames(
    'Select',
    { SelectDisabled: selected.info.isDisabled }
  )}>
    <Name
      name={selected.name}
      isChangeable={false}
    />
    <Text
      text={text}
      isChangeable={false}
    />
  </div>
}

Select.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default connect()(Select);