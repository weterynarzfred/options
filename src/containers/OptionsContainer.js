import React from 'react';
import { connect } from 'react-redux';
import Option from '../pages/Option';
import propShapes from '../propShapes';
import getControlType from '../functions/getControlType';
import getSubptions from '../functions/getSubptions';
import getSelectedCount from '../functions/getSelectedCount';

function getOptionInfo(option, options) {
  if (option.path === undefined) return {suboptions: options};
  const optionInfo =  {
    controlType: getControlType(option),
    suboptions: getSubptions(option, options, true),
    isSelected: getSelectedCount(option, options) > 0,
  };
  optionInfo.isOpenable = Object.keys(optionInfo.suboptions).length > 0;

  return optionInfo;
}

function handleBuy(option) {
  this.dispatch({
    type: 'BUY_OPTION',
    option,
  });
}

function handleSell(option) {
  this.dispatch({
    type: 'SELL_OPTION',
    option,
  });
}

function handleChange(option, textProp, text) {
  this.dispatch({
    type: 'CHANGE_TEXT',
    option,
    textProp,
    text,
  });
}

function OptionsContainer(props) {
  const optionInfo = getOptionInfo(props.option, props.options);
  const optionsElements = [];
  for (const slug in optionInfo.suboptions) {
    const currentOption = optionInfo.suboptions[slug];
    if (currentOption.type === 'option' || currentOption.type === 'group') {
      optionsElements.push(<Option
        key={`option-${currentOption.path}`}
        option={currentOption}
        buy={handleBuy.bind(props, currentOption)}
        sell={handleSell.bind(props, currentOption)}
        change={handleChange.bind(props, currentOption)}
        optionInfo={getOptionInfo(currentOption, props.options)}
      />);
    }
    else {
      optionsElements.push(<div key={`option-${currentOption.path}`}>
        story elements not implemented
      </div>);
    }
  }

  return <div className="OptionsContainer">
    {optionsElements}
  </div>;
}

OptionsContainer.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(OptionsContainer);