import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OptionControls from './OptionControls';
import getControlType from '../functions/getControlType';
import propShapes from '../propShapes';
import SuboptionsContainer from '../containers/SuboptionsContainer';
import Select from './Select';
import Image from './Image';
import OptionBox from './OptionBox';
import DisabledOverlay from './DisabledOverlay';

function handleClick(event) {
  if (event.detail.fromOptionControl) return;
  if (event.detail.fromSuboptions) return;
  if (event.detail.fromLink) return;
  if (this.option.info.isDisabled) return;

  switch (getControlType(this.option)) {
    case 'checkbox':
      if (this.option.selected) this.sell(this.option);
      else this.buy(this.option);
      break;
    case 'spinbox':
      this.buy(this.option);
      break;
    default:
  }
}

function Option(props) {
  const optionInfo = props.optionInfo;

  if (
    props.isSummaryMode &&
    ['option', 'group'].includes(props.option.type) &&
    (
      props.option.info.isDisabled ||
      !props.option.info.isSelected
    )
  ) return false;

  const controllClass = props.isSummaryMode ? false : `OptionControl-${optionInfo.controlType}`;
  return <div
    className={classNames(
      'Option',
      controllClass,
      `OptionType-${props.option.type}`,
      { OptionSelected: props.option.info.isSelected },
      { OptionOpenable: optionInfo.isOpenable },
      { OptionHasImage: optionInfo.image },
      { OptionDisabled: props.option.info.isDisabled },
      ...props.option.classes
    )}
  >
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
      trade={props.trade}
      optionInfo={optionInfo}
      isSummaryMode={props.isSummaryMode}
    />
    <div
      className="OptionWrap"
      onClick={props.isSummaryMode ? undefined : handleClick.bind(props)}
    >
      <div className="OptionContent">
        <Image
          src={optionInfo.image}
          cx={optionInfo.imageCx}
          cy={optionInfo.imageCy}
        />
        <OptionBox
          option={props.option}
          getStastsFrom={optionInfo.getStastsFrom}
          change={props.change}
          optionInfo={optionInfo}
        />
      </div>
      <Select
        option={props.option}
        optionInfo={optionInfo}
        options={props.options}
      />
      <SuboptionsContainer
        option={props.option}
        suboptions={props.optionInfo.suboptions}
        optionInfo={optionInfo}
      />
      <DisabledOverlay
        option={props.option}
        optionInfo={optionInfo}
      />
    </div>
  </div>;
}

Option.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
  trade: PropTypes.func,
  change: PropTypes.func,
  optionInfo: PropTypes.object,
  isSummaryMode: PropTypes.bool,
};

export default Option;