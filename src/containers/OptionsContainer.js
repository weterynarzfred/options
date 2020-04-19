import React from 'react';
import { connect } from 'react-redux';
import Option from '../pages/Option';
import propShapes from '../propShapes';
import isOptionDisabled from '../functions/isOptionDisabled';
import getOptionInfo from '../functions/getOptionInfo';
import getSubptions from '../functions/getSubptions';

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

function handleTrade(option, value) {
  this.dispatch({
    type: 'TRADE_OPTION',
    value,
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
  const suboptions = getSubptions(props.option, props.options, true);
  const optionsElements = [];
  for (const slug in suboptions) {
    const currentOption = suboptions[slug];
    if (isOptionDisabled(currentOption, props.options)) continue;
    optionsElements.push(<Option
      key={`option-${currentOption.path}`}
      option={currentOption}
      buy={handleBuy.bind(props)}
      sell={handleSell.bind(props)}
      trade={handleTrade.bind(props)}
      change={handleChange.bind(props)}
      optionInfo={getOptionInfo(currentOption, props.options)}
    />);
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