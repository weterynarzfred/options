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
    const suboption = suboptions[slug];
    const suboptionInfo = getOptionInfo(suboption, props.options);
    if (
      !suboption.showAsSuboption ||
      (
        props.optionInfo.controlType === 'select' &&
        suboptionInfo.isSelectableSuboption
      ) ||
      (
        !suboption.showWhenDisabled &&
        suboption.info.isDisabled
      )
    ) continue;
    if (suboption.type === 'option' || suboption.type === 'group') {
      suboptionsElements.push(<Suboption
        key={`suboption-${suboption.path}`}
        option={suboption}
        buy={handleBuy.bind(props)}
        sell={handleSell.bind(props)}
        trade={handleTrade.bind(props)}
        change={handleChange.bind(props)}
        optionInfo={suboptionInfo}
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
    path: state.path,
  };
}

export default connect(mapStateToProps)(SuboptionsContainer);