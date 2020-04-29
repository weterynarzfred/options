import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propShapes from '../propShapes';
import Suboption from '../pages/Suboption';
import SuboptionsPage from '../pages/SuboptionsPage';
import getOptionInfo from '../functions/getOptionInfo';
import { handleBuy, handleSell, handleChange, handleTrade } from '../functions/handlers';

function SuboptionsContainer(props) {
  const suboptions = props.suboptions;
  if (Object.keys(suboptions).length === 0) return false;
  if (props.option.info.isDisabled) return false;

  const suboptionsElements = [];
  for (const slug in suboptions) {
    const currentOption = suboptions[slug];
    const optionInfo = getOptionInfo(currentOption, props.options);
    if (
      (
        optionInfo.controlType === 'select' &&
        optionInfo.isSelectableSuboption
      ) ||
      (
        !currentOption.showWhenDisabled &&
        currentOption.info.isDisabled
      )
    ) continue;
    if (currentOption.type === 'option' || currentOption.type === 'group') {
      suboptionsElements.push(<Suboption
        key={`suboption-${currentOption.path}`}
        option={currentOption}
        buy={handleBuy.bind(props)}
        sell={handleSell.bind(props)}
        trade={handleTrade.bind(props)}
        change={handleChange.bind(props)}
        optionInfo={optionInfo}
      />);
    }
  }
  if (suboptionsElements.length === 0) return false;

  return <SuboptionsPage>
    {suboptionsElements}
  </SuboptionsPage>;
}

SuboptionsContainer.propTypes = {
  option: propShapes.option,
  suboptions: PropTypes.objectOf(propShapes.option),
  optionInfo: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    options: state.options,
    path: state.path.map(e => e.slug),
  };
}

export default connect(mapStateToProps)(SuboptionsContainer);