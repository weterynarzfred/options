import PropTypes from 'prop-types';

const propShapes = {};

propShapes.text = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.shape({
    isUserFunction: PropTypes.bool,
    functionId: PropTypes.number,
    value: PropTypes.node,
  }),
]);

propShapes.currency = PropTypes.objectOf(PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.number,
}));

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
  cost: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ])),
  options: PropTypes.object,
  test: PropTypes.func,
  optionCurrency: propShapes.currency,
  optionsFunction: PropTypes.func,
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