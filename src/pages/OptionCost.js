import React from 'react';
import propShapes from '../propShapes';

function OptionCost(props) {
  if (props.cost === undefined) return false;
  const costs = [];
  for (const costSlug in props.cost) {
    const cost = props.cost[costSlug];
    costs.push(
      <div className="OptionCost-single" key={`cost-${costSlug}`}>
        <div className="OptionCost-name">{cost.name}</div>
        <div className="OptionCost-value">{cost.nextValue}</div>
      </div>
    );
  }
  return <div className="OptionCost">
    {costs}
  </div>
}

OptionCost.propTypes = {
  cost: propShapes.cost,
};

export default OptionCost;