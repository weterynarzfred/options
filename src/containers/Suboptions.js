import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import Suboption from '../pages/Suboption';
import SuboptionsPage from '../pages/SuboptionsPage';
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

function handleChange(option, textProp, text) {
  this.dispatch({
    type: 'CHANGE_TEXT',
    option,
    textProp,
    text,
  });
}

function Suboptions(props) {
  const suboptions = props.suboptions;
  if (Object.keys(suboptions).length === 0) return false;

  const suboptionsElements = [];
  for (const slug in suboptions) {
    const currentOption = suboptions[slug];
    if (currentOption.type === 'option' || currentOption.type === 'group') {
      suboptionsElements.push(<Suboption
        key={`suboption-${currentOption.path}`}
        option={currentOption}
        buy={handleBuy.bind(props, currentOption)}
        sell={handleSell.bind(props, currentOption)}
        change={handleChange.bind(props, currentOption)}
        optionInfo={getOptionInfo(currentOption, props.options)}
      />);
    }
  }
  return <SuboptionsPage>
    {suboptionsElements}
  </SuboptionsPage>;
}

Suboptions.propTypes = {
  option: propShapes.option,
  suboptions: PropTypes.objectOf(propShapes.option),
};

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(Suboptions);