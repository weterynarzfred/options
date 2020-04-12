import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from "cash-dom";
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import OptionsContainer from './OptionsContainer';
import isOptionDisabled, { isOptionDisplayed } from '../functions/isOptionDisabled';
import getSyntheticOptions from '../functions/getSyntheticOptions';
import { getSelectedCount } from '../functions/getSelected';
import OptionCurrency from './OptionCurrency';
import OpenButton from './OpenButton';
import OptionErrors from './OptionErrors';
import OptionName from './OptionName';
import OptionText from './OptionText';
import OptionImage from './OptionImage';
import OptionLink from './OptionLink';

export function getChildOptions(option, options, skipDisabled = false) {
  let currentOptions;
  if (option.hasIndividualChildren) {
    currentOptions = option.selected;
  }
  else if (option.optionsFunction !== undefined) {
    currentOptions = getSyntheticOptions(option, options)
  }
  else {
    currentOptions = option.options;
  }

  if (!currentOptions) return {};

  if (skipDisabled) {
    const result = {};
    for (const slug in currentOptions) {
      if (isOptionDisabled(currentOptions[slug], options)) continue;
      result[slug] = currentOptions[slug];
    }
    return result;
  }

  return currentOptions;
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

function checkHasCheckbox(option) {
  return option.type === 'option' &&
    !option.hasIndividualChildren &&
    option.max === 1;
}

function checkHasSpinBox(option) {
  return option.type === 'option' &&
    !option.hasIndividualChildren &&
    option.max > 1;
}

function checkOpenable(option) {
  return option.options !== undefined ||
    option.individualOptions !== undefined ||
    option.optionsFunction !== undefined
}

function handleClick(event) {
  event.stopPropagation();
  if (this.hasCheckbox && !this.isMainContainer) {
    $(event.currentTarget).find('.option-checkbox').eq(0).trigger('click');
  }
  if (this.hasSpinBox && !this.isMainContainer) {
    $(event.currentTarget).find('.SpinBox-increase').eq(0).trigger('click');
  }
}

function Option(props) {
  if (!isOptionDisplayed(props.option, props)) {
    return false;
  }
  const displayedChildren = getDisplayedChildOptions(props);
  const optionProps = {
    option: props.option,
    isDisabled: isOptionDisabled(props.option, props.options),
    openable: checkOpenable(props.option),
    enabledChildren: getChildOptions(props.option, props.options, true),
    hasDisplayedChildren: displayedChildren !== undefined &&
      Object.getOwnPropertyNames(displayedChildren).length > 0,
    hasCheckbox: checkHasCheckbox(props.option),
    hasSpinBox: checkHasSpinBox(props.option),
    selectable: props.option.type === 'option' &&
      !props.option.hasIndividualChildren,
    isSelected: props.option.type === 'option' &&
      !props.option.hasIndividualChildren &&
      getSelectedCount(props.option, props.options),
    isMainContainer: props.currentlySelected,
  };
  optionProps.suboptionsDisabled = optionProps.openable &&
    Object.getOwnPropertyNames(optionProps.enabledChildren).length === 0;

  if (props.settings.hideDisabledOptions && optionProps.isDisabled) {
    return false;
  }

  return (
    <div
      className={classNames(
        'Option',
        {lastLevel: !optionProps.hasDisplayedChildren},
        {openable: optionProps.openable},
        {disabled: optionProps.isDisabled},
        {hasCheckbox: optionProps.hasCheckbox},
        {hasSpinBox: optionProps.hasSpinBox},
        {selectable: optionProps.selectable},
        {selected: optionProps.isSelected},
        {MainContainer: optionProps.isMainContainer}
      )}
      onClick={handleClick.bind(optionProps)}
    >
      <div className="Option-content">
        <div className="Option-head">
          <OptionImage option={props.option} />
          <div className="Option-stats">
            <OptionCurrency
              option={props.option}
              currentlySelected={props.currentlySelected}
            />
            <OptionCosts option={props.option}/>
          </div>
        </div>
        <OptionName option={props.option} />
        <OptionText option={props.option} />
        <OptionControls option={props.option} />
        <OptionsContainer
          option={props.option}
          containerOptions={optionProps.enabledChildren}
        />
        <div className="Option-foot">
          <OptionErrors option={props.option} />
          <OpenButton
            option={props.option}
            currentlySelected={props.currentlySelected}
            openable={optionProps.openable}
            suboptionsDisabled={optionProps.suboptionsDisabled}
          />
          <OptionLink option={props.option} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
