import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import OptionControls from './OptionControls';
import Select from './Select';
import Image from './Image';
import OptionBox from './OptionBox';
import DisabledOverlay from './DisabledOverlay';

function Suboption(props) {
  const optionInfo = props.optionInfo;

  return <div
    className={classNames(
      'Suboption',
      `OptionControl-${optionInfo.controlType}`,
      `OptionType-${props.option.type}`,
      { OptionSelected: optionInfo.isSelected },
      { OptionOpenable: optionInfo.isOpenable },
      { SelectableSuboption: optionInfo.isSelectableSuboption },
      { OptionHasImage: optionInfo.image },
      { OptionDisabled: props.option.info.isDisabled }
    )}
  >
    <OptionControls
      option={props.option}
      sell={props.sell}
      buy={props.buy}
      trade={props.trade}
      optionInfo={optionInfo}
    />
    <div className="SuboptionWrap">
      <div className="SuboptionContent">
        <Image src={optionInfo.image} />
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
      />
      <DisabledOverlay
        option={props.option}
        optionInfo={optionInfo}
      />
    </div>
  </div>
}

Suboption.propTypes = {
  option: propShapes.option,
  buy: PropTypes.func,
  sell: PropTypes.func,
  change: PropTypes.func,
  optionInfo: PropTypes.object,
};

export default Suboption;