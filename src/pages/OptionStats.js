import React from 'react';
import propShapes from '../propShapes';
import CurrencyStats from './CurrencyStats';
import OptionCost from './OptionCost';

function OptionStats(props) {
  return <div className="OptionStats">
    <CurrencyStats currency={props.option.optionCurrency} />
    <OptionCost cost={props.option.cost} />
  </div>
}

Option.propTypes = {
  option: propShapes.option,
};

export default OptionStats;