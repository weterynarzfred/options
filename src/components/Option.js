import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from "cash-dom";
import OptionCosts from './OptionCosts';
import OptionControls from './OptionControls';
import OptionsContainer from './OptionsContainer';
import isOptionDisabled from '../functions/isOptionDisabled';
import isOptionDisplayed from '../functions/isOptionDisplayed';
import getSelectedCount from '../functions/getSelectedCount';
import OptionCurrency from './OptionCurrency';
import OpenButton from './OpenButton';
import OptionErrors from './OptionErrors';
import OptionName from './OptionName';
import OptionText from './OptionText';
import OptionImage from './OptionImage';
import OptionLink from './OptionLink';
import getChildOptions from '../functions/getChildOptions';

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

function createOptionsProps(props) {
  const displayedChildren = getDisplayedChildOptions(props);
  const optionProps = {}

  optionProps.option = props.option;

  optionProps.isDisabled = isOptionDisabled(props.option, props.options);

  optionProps.openable = props.option.options !== undefined ||
    props.option.hasIndividualChildren !== undefined ||
    props.option.optionsFunction !== undefined;

  optionProps.enabledChildren = getChildOptions(props.option, props.options, true);

  optionProps.hasDisplayedChildren = displayedChildren !== undefined &&
    Object.getOwnPropertyNames(displayedChildren).length > 0

  optionProps.hasCheckbox = props.option.type === 'option' &&
    !props.option.hasIndividualChildren &&
    props.option.max === 1;

  optionProps.hasSpinBox = props.option.type === 'option' &&
    !props.option.hasIndividualChildren &&
    (props.option.max > 1 || props.option.max === false);

  optionProps.selectable = props.option.type === 'option' &&
    !props.option.hasIndividualChildren;

  optionProps.isSelected = props.option.type === 'option' &&
    !props.option.hasIndividualChildren &&
    getSelectedCount(props.option, props.options);

  optionProps.isMainContainer = props.currentlySelected;
  
  optionProps.suboptionsDisabled = optionProps.openable &&
    Object.getOwnPropertyNames(optionProps.enabledChildren).length === 0;

  return optionProps;
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

  const optionProps = createOptionsProps(props);

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
  return {
    options: state.options,
    settings: state.settings,
    path: state.path,
  };
}

export default connect(mapStateToProps)(Option);
