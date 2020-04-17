import React from 'react';
import { connect } from 'react-redux';
import getOption from './../functions/getOption';
import Option from '../pages/Option';
import OptionsSection from '../pages/OptionsSection';

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

function Content(props) {
  let selectedOption;
  if (props.path.length > 0) {
    selectedOption = getOption(props.path, props.options);
  }
  else {
    selectedOption = {options: props.options};
  }

  const optionsElements = [];
  for (const slug in selectedOption.options) {
    const currentOption = selectedOption.options[slug];
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

  return <OptionsSection>
    {optionsElements}
  </OptionsSection>;
}

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(Content);