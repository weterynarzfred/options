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
  if (this.isSummaryMode || this.option.info.isUnseen) {
    this.markSeen(this.option);
  }
}

function handleWrapClick(event) {
  if (
    this.isSummaryMode ||
    event.detail.fromOptionControl ||
    event.detail.fromSuboptions ||
    event.detail.fromLink ||
    this.option.info.isDisabled
  ) return;

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

let mouseEnterTimeout;
function handleMouseEnter() {
  if (this.isSummaryMode || !this.option.info.isUnseen) return;
  mouseEnterTimeout = setTimeout(() => {
    this.markSeen(this.option);
  }, 1000);
}

function handleMouseLeave() {
  if (this.isSummaryMode || !this.option.info.isUnseen) return;
  clearTimeout(mouseEnterTimeout);
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

  const controllClass = props.isSummaryMode ?
    false : `OptionControl-${optionInfo.controlType}`;
  return <div
    id={props.option.path.replace('/', '_')}
    className={classNames(
      'Option',
      controllClass,
      `OptionType-${props.option.type}`,
      { OptionSelected: props.option.info.isSelected },
      { OptionOpenable: optionInfo.isOpenable },
      { OptionHasImage: optionInfo.image },
      { OptionDisabled: props.option.info.isDisabled },
      { isUnseen: !props.isSummaryMode && props.option.info.isUnseen },
      ...props.option.classes
    )}
    onClick={handleClick.bind(props)}
    onMouseEnter={handleMouseEnter.bind(props)}
    onMouseLeave={handleMouseLeave.bind(props)}
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
      onClick={handleWrapClick.bind(props)}
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