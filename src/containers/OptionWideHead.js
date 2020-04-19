import React from 'react';
import { connect } from 'react-redux';
import propShapes from '../propShapes';
import Name from './../pages/Name';
import OptionControls from './OptionControls';
import Text from '../pages/Text';
import OptionStats from './../pages/OptionStats';
import OptionFoot from './OptionFoot';
import getOptionInfo from '../functions/getOptionInfo';

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

function OptionWideHead(props) {
  const optionInfo = getOptionInfo(props.option, props.options);

  return <div className="OptionWideHead">
    <OptionControls
      option={props.option}
      buy={handleBuy.bind(props, props.option)}
      sell={handleSell.bind(props, props.option)}
      trade={handleTrade.bind(props, props.option)}
      optionInfo={optionInfo}
    />
    <OptionStats
      option={props.option}
    />
    <Name
      name={props.option.name + ': ' + optionInfo.depth}
      isChangeable={props.option.isChild}
      change={handleChange.bind(props, props.option)}
    />
    <Text
      text={props.option.text}
      isChangeable={props.option.isChild}
      change={props.change}
    />
    <OptionFoot option={props.option} />
  </div>
}

OptionWideHead.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(OptionWideHead);