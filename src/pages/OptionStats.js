import React from 'react';
import propShapes from '../propShapes';
import CurrencyStats from './CurrencyStats';
import OptionCost from './OptionCost';

function OptionStats(props) {
  if (
    props.option.cost === undefined &&
    props.option.optionCurrency === undefined
  ) return false;

  return <div className="OptionStats">
    <OptionCost cost={props.option.cost} />
    <CurrencyStats currency={props.option.optionCurrency} />
  </div>
}

Option.propTypes = {
  option: propShapes.option,
};

export default OptionStats;