import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from './../propShapes';
import Text from './Text';

function Select(props) {
  if (
    props.option.type !== 'group' ||
    props.option.max !== 1 ||
    props.optionInfo.selectableSuboptions.length <= 1
  ) return false;

  const selected = props.optionInfo.selectableSuboptions[props.optionInfo.selectedSuboptionId];
  if (selected === undefined) return false;

  return <div className="Select">
    <Text
      text={selected.text}
      isChangeable={false}
    />
  </div>
}

Select.propTypes = {
  option: propShapes.option,
  optionInfo: PropTypes.object,
};

export default connect()(Select);