import React from 'react';
import { connect } from 'react-redux';
import propShapes from '../propShapes';
import OptionControls from './../pages/OptionControls';
import getOptionInfo from '../functions/getOptionInfo';
import { handleBuy, handleSell, handleChange, handleTrade } from './../functions/handlers';
import OptionBox from '../pages/OptionBox';
import Image from '../pages/Image';

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
    <div className="OptionContent">
      <Image
        src={optionInfo.image}
        cx={optionInfo.imageCx}
        cy={optionInfo.imageCy}
      />
      <OptionBox
        option={props.option}
        getStastsFrom={optionInfo.getStastsFrom}
        change={handleChange}
        optionInfo={optionInfo}
        isOpened={true}
      />
    </div>
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