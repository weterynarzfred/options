import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Hyphenated from 'react-hyphen';
import $ from "cash-dom";
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import CurrencyStats from './CurrencyStats';
import OptionsContainer from './OptionsContainer';
import isOptionDisabled, { isOptionDisplayed } from '../functions/isOptionDisabled';
import getSyntheticOptions from '../functions/getSyntheticOptions';
import { getSelectedCount } from '../functions/getSelected';

function displayOptionCurrency(props) {
  const option = props.option;
  if (option.optionCurrency === undefined) return null;
  return <CurrencyStats
    currentOptions={getChildOptions(option, props.options)}
    currency={option.optionCurrency}
  />
}

export function getChildOptions(option, options) {
  if (option.hasIndividualChildren) {
    return option.selected;
  }
  else if (option.optionsFunction !== undefined) {
    return getSyntheticOptions(option, options)
  }
  else {
    return option.options;
  }
}

function getDisplayedChildOptions(props) {
  const children = getChildOptions(props.option, props.options);
  if (!children) return undefined;
  const displayedChildren = {};
  for (const slug in children) {
    const child = children[slug];
    if (isOptionDisplayed(child, props)) {
      displayedChildren[slug] = child;
    }
  }
  return displayedChildren;
}

function getOpenButton(props) {
  if (props.currentlySelected) return;
  return <button className="Option-open" onClick={event => {
    event.stopPropagation();
    props.dispatch({
      type: 'CHANGE_PATH',
      path: props.option.path.split('/'),
    });
  }}>
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="10" r="15" />
      <circle cx="50" cy="50" r="15" />
      <circle cx="50" cy="90" r="15" />
    </svg>
  </button>;
}

function getOptionText(props) {
  if (typeof props.option.text === 'function') return props.option.text({
    option: props.option,
    options: props.options,
  });
  return props.option.text;
}

function getErrors(props) {
  return props.errors.filter(error => error.path === props.option.path)
    .map((e, i) => (
      <div className="error" key={`option-error-${i}`}>
        {e.text}
      </div>
    ));
}

function getContent(disabled, props) {
  return <React.Fragment>
    <Hyphenated>
      <div className="Option-text text">
        {getOptionText(props)}
      </div>
    </Hyphenated>
    <OptionControls option={props.option} />
    <OptionsContainer
      containerOptions={getChildOptions(props.option, props.options)}
    />
    {getOpenButton(props)}
    {getErrors(props)}
  </React.Fragment>;
}

function checkHasCheckbox(option) {
  return option.type === 'option' &&
    !option.hasIndividualChildren &&
    option.max === 1;
}

function optionClick(event) {
  event.stopPropagation();
  if (this.hasCheckbox) {
    $(event.currentTarget).find('.option-checkbox').eq(0).trigger('click');
  }
}

function optionMouseEnter(event) {
  event.stopPropagation();
  const target = $(event.currentTarget);
  target.addClass('focused');
  target.parents('.focused').removeClass('focused');
}

function optionMouseLeave(event) {
  event.stopPropagation();
  const target = $(event.currentTarget);
  target.removeClass('focused');
  target.parents('.Option').eq(0).addClass('focused');
}

function getOptionName(option, props) {
  if (option.isChild) {
    return <div className="Option-name">
      <input
        value={props.option.name}
        onChange={event => {
          props.dispatch({
            type: 'RENAME_CHILD',
            option,
            name: event.target.value,
          });
        }}
      />
    </div>
  }
  return <div className="Option-name">
    {props.option.name}
  </div>;
}

function Option(props) {
  if (!isOptionDisplayed(props.option, props)) {
    return false;
  }
  const children = getDisplayedChildOptions(props);
  const optionProps = {
    option: props.option,
    children,
    isDisabled: isOptionDisabled(props.option, props.options),
    hasChildren: children !== undefined &&
      Object.keys(children).length > 0,
    hasCheckbox: checkHasCheckbox(props.option),
    isSelected: props.option.type === 'option' &&
      getSelectedCount(props.option, props.options),
  };

  if (props.settings.hideDisabledOptions && optionProps.isDisabled) {
    return false;
  }

  return (
    <div
      className={classNames(
        'Option',
        {lastLevel: !optionProps.hasChildren},
        {disabled: optionProps.isDisabled},
        {hasCheckbox: optionProps.hasCheckbox},
        {selected: optionProps.isSelected},
        {MainContainer: props.currentlySelected}
      )}
      onClick={optionClick.bind(optionProps)}
      onMouseEnter={optionMouseEnter.bind(optionProps)}
      onMouseLeave={optionMouseLeave.bind(optionProps)}
    >
      <div className="Option-content">
        <div
          className="Option-image"
          style={{
            backgroundImage: `url(${props.option.image})`,
          }}
        >
          <div className="Option-stats">
            {displayOptionCurrency(props)}
            <OptionCosts option={props.option}/>
          </div>
        </div>
        <div className="text">
          {getOptionName(props.option, props)}
        </div>
        {getContent(optionProps.isDisabled, props)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
