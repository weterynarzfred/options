import PropTypes from 'prop-types';

const propShapes = {};

propShapes.userFunction = PropTypes.shape({
  isUserFunction: PropTypes.bool,
  functionId: PropTypes.number,
  value: PropTypes.any,
});

propShapes.text = PropTypes.oneOfType([
  PropTypes.node,
  propShapes.userFunction,
]);

propShapes.currency = PropTypes.objectOf(PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.number,
  currentValue: PropTypes.number,
}));

propShapes.cost = PropTypes.objectOf(PropTypes.object);

propShapes.option = PropTypes.shape({
  type: PropTypes.oneOf(['option', 'group', 'story']),
  name: PropTypes.node,
  text: propShapes.text,
  link: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  image: PropTypes.string,
  cost: propShapes.cost,
  options: PropTypes.object,
  test: propShapes.userFunction,
  optionCurrency: propShapes.currency,
  optionsFunction: propShapes.userFunction,
  hasIndividualChildren: PropTypes.bool,
  individualOptions: PropTypes.object,
  childOptionCurrency: propShapes.currency,
  slug: PropTypes.string,
  path: PropTypes.string,
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.object),
  ]),
  isChild: PropTypes.bool,
  isSynthetic: PropTypes.bool,
  functionalChildren: PropTypes.object,
});

export default propShapes;