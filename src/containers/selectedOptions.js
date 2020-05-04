import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import getSubptions from '../functions/getSubptions';
import getSelected from '../functions/getSelected';
import isOptionDisabled from '../functions/isOptionDisabled';
import getCurrencies from '../functions/getCurrencies';
import CurrencyStats from '../pages/CurrencyStats';
import PathLink from './PathLink';
import { replaceLastOccurence } from '../functions/helpers';

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
    const children = getSelectedHierarchy(option, options);
    let path = replaceLastOccurence(option.path, '/', '#');
    if (path.search('/') < 0 && path.search('#') < 0) path = '#' + path;
    if ((typeof value === 'number' && value > 0) || children.length > 0) {
      selected.push(<li
        className={classNames(
          'list-option',
          { listOptionHasChildren: children.length > 0 },
          { listOptionHasCost: cost }
        )}
        key={`list-option-${option.path}`}
      >
        <div className="listOptionContent">
          <div>
            <PathLink text={option.name} path={path} />
            {value > 1 ? ' × ' + value : ''}
          </div>
          {cost ? <svg className="listOptionFill" viewBox="0 0 100 3">
            <path d="M1 1L99 1" vectorEffect="non-scaling-stroke" />
          </svg> : ''}
          <div>{cost}</div>
        </div>
        {children.length > 0 ? <ul>{children}</ul> : ''}
      </li>);
    }
  }

  return selected;
}

function SelectedOptions(props) {
  const selected = getSelectedHierarchy({ options: props.options }, props.options);
  const currentCurrencies = getCurrencies(props, props.path);
  return <React.Fragment>
    <ul className="SelectedOptions">
      {selected}
    </ul>
    <CurrencyStats currency={currentCurrencies} />
  </React.Fragment>;
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    options: state.options,
    path: state.path,
  };
}

export default connect(mapStateToProps)(SelectedOptions);