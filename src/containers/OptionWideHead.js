import React from 'react';
import { connect } from 'react-redux';
import propShapes from '../propShapes';
import Name from './../pages/Name';
import OptionControls from './OptionControls';
import Text from '../pages/Text';
import OptionStats from './../pages/OptionStats';
import OptionFoot from './OptionFoot';
import getOptionInfo from '../functions/getOptionInfo';
import { handleBuy, handleSell, handleChange, handleTrade } from './../functions/handlers';

function OptionWideHead(props) {
  const optionInfo = getOptionInfo(props.option, props.options);

  return <div className="OptionWideHead">
    <OptionControls
      option={props.option}
      buy={handleBuy.bind(props)}
      sell={handleSell.bind(props)}
      trade={handleTrade.bind(props)}
      optionInfo={optionInfo}
    />
    <OptionStats
      option={props.option}
    />
    <Name
      name={props.option.name}
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