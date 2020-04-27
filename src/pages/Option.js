import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Text from './Text';
import OptionControls from '../containers/OptionControls';
import getControlType from '../functions/getControlType';
import propShapes from '../propShapes';
import SuboptionsContainer from '../containers/SuboptionsContainer';
import Name from './Name';
import OptionLinks from '../containers/OptionLinks';
import OptionStats from './OptionStats';
import OptionFoot from '../containers/OptionFoot';
import Select from './Select';
import Image from './Image';
import DisabledOverlay from './DisabledOverlay';

function handleClick(event) {
  if (event.detail.fromOptionControl) return;
  if (event.detail.fromSuboptions) return;
  if (event.detail.fromLink) return;
  if (this.optionInfo.isDisabled) return;

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

  let image = props.option.image;
  let getStastsFrom = props.option;
  if (optionInfo.controlType === 'select') {
    if (optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId] !== undefined) {
      getStastsFrom = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId];
      if (props.option.useImageOfSelected) {
        image = optionInfo.selectableSuboptions[optionInfo.selectedSuboptionId].image;
      }
    }
  }

  return <div
    className={classNames(
      'Option',
      `OptionControl-${optionInfo.controlType}`,
      `OptionType-${props.option.type}`,
      { OptionSelected: optionInfo.isSelected },
      { OptionOpenable: optionInfo.isOpenable },
      { OptionHasImage: image },
      { OptionDisabled: optionInfo.isDisabled }
    )}
  >
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
      trade={props.trade}
      optionInfo={optionInfo}
    />
    <div
      className={classNames(
        'OptionWrap',
        { OptionWrapHasImage: image !== undefined }
      )}
      onClick={handleClick.bind(props)}
    >
      <Image src={image} />
      <div className="OptionHead">
        <OptionStats
          option={getStastsFrom}
        />
      </div>
      <div className="OptionContent">
        <Name
          name={props.option.name}
          isChangeable={props.option.isChild}
          change={props.change.bind(null, props.option)}
        />
        <Text
          text={props.option.text}
          isChangeable={props.option.isChild}
          change={props.change.bind(null, props.option)}
        />
        <OptionLinks
          option={props.option}
          depth={optionInfo.depth}
        />
        <OptionFoot option={props.option} />
        <Select
          option={props.option}
          optionInfo={optionInfo}
        />
        <SuboptionsContainer
          option={props.option}
          suboptions={props.optionInfo.suboptions}
          optionInfo={optionInfo}
        />
      </div>
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
  optionInfo: PropTypes.object,
};

export default Option;