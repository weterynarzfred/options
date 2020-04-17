import React from 'react';
import { connect } from 'react-redux';
import Option from '../pages/Option';
import propShapes from '../propShapes';

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
  const optionsElements = [];
  for (const slug in props.option.options) {
    const currentOption = props.option.options[slug];
    if (currentOption.type === 'option' || currentOption.type === 'group') {
      optionsElements.push(<Option
        key={`option-${currentOption.path}`}
        option={currentOption}
        buy={handleBuy.bind(props, currentOption)}
        sell={handleSell.bind(props, currentOption)}
        change={handleChange.bind(props, currentOption)}
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