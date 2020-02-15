import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCount } from '../functions/getSelected';
import { getChildOptions } from './Option';

function findErrors(currentOptions, options) {
  const errors = [];
  for (const slug in currentOptions) {
    const option = currentOptions[slug];
    if (option.min !== undefined) {
      const selectedCount = getSelectedCount(option, options);
      if (selectedCount < option.min) {
        errors.push({
          text: `Option ${option.path} cannot have less than ${option.min} slected.`,
        });
      }
    }
    errors.push(...findErrors(getChildOptions(option, options), options));
  }
  return errors;
}

function Errors(props) {
  const errors = findErrors(props.options, props.options);
  return (
    <div className="Errors">
      {errors.map((e, i) => <div className="error" key={`error-${i}`}>
        {e.text}
      </div>)}
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Errors);
