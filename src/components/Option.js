import React from 'react';
import { connect } from 'react-redux';
import displayOptions from './../functions/displayOptions';
import Checkbox from './Checkbox';
import SpinBox from './SpinBox';
import ChildrenContainer from './ChildrenContainer';
import RemoveChild from './RemoveChild';

function displaySuboptions(option) {
  if (option.hasIndividualChildren) return displayOptions(option.selected);
  return displayOptions(option.options);
}

function displayControls(props) {
  if (props.option.type === 'option') {
    if (!props.option.hasIndividualChildren) {
      if (props.option.max === 1) {
        return <Checkbox option={props.option}/>;
      }
      else if (props.option.max > 1 || props.option.max === -1) {
        return <SpinBox option={props.option}/>;
      }
    }
    else {
      return <ChildrenContainer option={props.option}/>;
    }
  }
  else if (props.option.type === 'group') {
    if (props.option.isChild) {
      return <RemoveChild option={props.option} />;
    }
  }
}

function displayCost(props) {
  const option = props.option;
  if (option.type !== 'option') return;
  if (option.cost === undefined) return;
  const costs = [];
  for (const currencySlug in option.cost) {
    const cost = option.cost[currencySlug];
    const currencyName = props.settings.currency[currencySlug].name;
    costs.push(
      <div
        className="Option-cost"
        key={`option-${option.path}-cost-${currencySlug}`}
      >
        <div className="Option-cost-currency">{currencyName}</div>
        <div className="Option-cost-value">{cost}</div>
      </div>
    );
  }
  return <div className="Option-costs">
    {costs}
  </div>;
}

function Option(props) {
  return (
    <div className="Option">
      {displayCost(props)}
      <div className="Option-name">
        {props.option.name}
      </div>
      {displayControls(props)}
      <div className="Option-suboptions">
        {displaySuboptions(props.option)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
