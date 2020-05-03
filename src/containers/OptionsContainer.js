import React from 'react';
import { connect } from 'react-redux';
import Option from '../pages/Option';
import propShapes from '../propShapes';
import getOptionInfo from '../functions/getOptionInfo';
import getSubptions from '../functions/getSubptions';
import { handleBuy, handleSell, handleChange, handleTrade } from './../functions/handlers';
import OptionsPage from '../pages/OptionsPage';
import { CSSTransition } from 'react-transition-group';

function OptionsContainer(props) {
  const suboptions = getSubptions(props.option, props.options);

  const optionsElements = [];
  for (const slug in suboptions) {
    const currentOption = suboptions[slug];

    if (!currentOption.showWhenDisabled && currentOption.info.isDisabled) continue;
    const optionInfo = getOptionInfo(currentOption, props.options);
    optionsElements.push(<CSSTransition
      key={`option-${currentOption.path}`}
      timeout={300}
      classNames="item"
    >
      <Option
        option={currentOption}
        buy={handleBuy.bind(props)}
        sell={handleSell.bind(props)}
        trade={handleTrade.bind(props)}
        change={handleChange.bind(props)}
        optionInfo={optionInfo}
        isSummaryMode={props.settings.isSummaryMode}
      />
    </CSSTransition>);
  }

  optionsElements.push(<CSSTransition
    key={`option-after-${props.option.path}`}
    timeout={300}
    classNames="item"
  ><div style={{
    width: '100%',
  }}></div></CSSTransition>);

  return <OptionsPage>
    {optionsElements}
  </OptionsPage>;
}

OptionsContainer.propTypes = {
  option: propShapes.option,
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(OptionsContainer);