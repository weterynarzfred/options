import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Text from './Text';
import OptionControls from '../containers/OptionControls';
import getControlType from '../functions/getControlType';
import propShapes from '../propShapes';
import Suboptions from '../containers/Suboptions';
import Name from './Name';
import OptionLinks from '../containers/OptionLinks';
import getSubptions from '../functions/getSubptions';
import getSelectedCount from '../functions/getSelectedCount';
import { connect } from 'react-redux';

function getOptionInfo(option, options) {
  const optionInfo =  {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options, true),
    isSelected: getSelectedCount(option, options) > 0,
  };

  return optionInfo;
}

function handleClick(event) {
  if (event.detail.fromOptionControl) return;
  
  switch(getControlType(this.option)) {
    case 'checkbox':
      if (this.option.selected) this.sell();
      else this.buy();
      break;
    case 'spinbox':
      this.buy();
      break;
    default:
  }
}

function Option(props) {
  const optionInfo = getOptionInfo(props.option, props.options);
  return <div
    className={classNames(
      'Option',
      `OptionControl-${optionInfo.controlType}`,
      {OptionSelected: optionInfo.isSelected}
    )}
    onClick={handleClick.bind(props)}
  >
    <div className="OptionWrap">
      <OptionControls
        option={props.option}
        sell={props.sell}
        buy={props.buy}
      />
      <Name
        name={props.option.name}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <Text
        text={props.option.text}
        isChangeable={props.option.isChild}
        change={props.change}
      />
      <OptionLinks option={props.option} />
      <Suboptions option={props.option} />
    </div>
  </div>;
}

Option.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(Option);