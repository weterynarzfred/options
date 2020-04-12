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

function checkHasCheckbox(option) {
  return option.type === 'option' &&
    !option.hasIndividualChildren &&
    option.max === 1;
}

function handleClick(event) {
  event.stopPropagation();
  if (this.hasCheckbox) {
    $(event.currentTarget).find('.option-checkbox').eq(0).trigger('click');
  }
}

function handleMouseEnter(event) {
  event.stopPropagation();
  const target = $(event.currentTarget);
  target.addClass('focused');
  target.parents('.focused').removeClass('focused');
}

function handleMouseLeave(event) {
  event.stopPropagation();
  const target = $(event.currentTarget);
  target.removeClass('focused');
  target.parents('.Option').eq(0).addClass('focused');
}

function Option(props) {
  if (!isOptionDisplayed(props.option, props)) {
    return false;
  }
  const displayedChildren = getDisplayedChildOptions(props);
  const optionProps = {
    option: props.option,
    isDisabled: isOptionDisabled(props.option, props.options),
    openable: props.option.options !== undefined || props.option.individualOptions !== undefined,
    hasDisplayedChildren: displayedChildren !== undefined &&
      Object.keys(displayedChildren).length > 0,
    hasCheckbox: checkHasCheckbox(props.option),
    selectable: props.option.type === 'option' &&
      !props.option.hasIndividualChildren,
    isSelected: props.option.type === 'option' &&
      !props.option.hasIndividualChildren &&
      getSelectedCount(props.option, props.options),
  };

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
        {selectable: optionProps.selectable},
        {selected: optionProps.isSelected},
        {MainContainer: props.currentlySelected}
      )}
      onClick={handleClick.bind(optionProps)}
      onMouseEnter={handleMouseEnter.bind(optionProps)}
      onMouseLeave={handleMouseLeave.bind(optionProps)}
    >
      <div className="Option-content">
        <div className="Option-head">
          <OptionImage option={props.option} />
          <div className="Option-stats">
            <OptionCurrency option={props.option} />
            <OptionCosts option={props.option}/>
          </div>
        </div>
        <div className="text">
          <OptionName option={props.option} />
        </div>
        <OptionText option={props.option} />
        <OptionControls option={props.option} />
        <OptionsContainer
          containerOptions={getChildOptions(props.option, props.options)}
        />
        <OpenButton
          option={props.option}
          currentlySelected={props.currentlySelected}
          openable={optionProps.openable}
        />
        <OptionErrors option={props.option} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Option);
