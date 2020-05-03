import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import getSubptions from '../functions/getSubptions';
import getSelected from '../functions/getSelected';
import isOptionDisabled from '../functions/isOptionDisabled';
import { getReadablePath } from '../functions/helpers';

function getValue(option, options) {
  if (isOptionDisabled(option, options)) return false;
  if (option.selected === undefined) {
    const selected = getSelected(option, options);
    if (selected === false || selected.length === 0) return false;
    return selected[0];
  }
  return option.selected;
}

function getCost(option, count) {
  if (option.cost === undefined) return false;
  const result = [];
  for (const currencySlug in option.cost) {
    const currency = option.cost[currencySlug];
    result.push(<div
      className={classNames(
        'list-option-cost',
        { costPositive: currency.value < 0 }
      )}
      key={`list-option-cost-${option.path}-${currencySlug}`}
    >
      <div className="list-option-cost-name">{currency.name}</div>
      <div className="list-option-cost-value">{
        (currency.value > 0 ? '' : '+') + (-currency.value * count)
      }</div>
    </div>);
  }
  return result;
}

function getSelectedHierarchy(parentOption, options) {
  let selected = [];
  const suboptions = getSubptions(parentOption, options);
  for (const slug in suboptions) {
    const option = suboptions[slug];
    if (isOptionDisabled(option, options)) continue;
    const value = getValue(option, options);
    const cost = getCost(option, value);
    if (typeof value === 'number' && value > 0) {
      selected.push(<tr
        className="list-option"
        key={`list-option-${option.path}`}
      >
        <td>
          {getReadablePath(option.path, options)}
          {value > 1 ? ' × ' + value : ''}
        </td>
        <td>{cost}</td>
      </tr>);
    }
    selected = selected.concat(getSelectedHierarchy(option, options));
  }

  return selected;
}

function SelectedOptions(props) {
  const selected = getSelectedHierarchy({ options: props.options }, props.options);
  return <table className="SelectedOptions">
    <tbody>
      {selected}
    </tbody>
  </table>;
}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

export default connect(mapStateToProps)(SelectedOptions);