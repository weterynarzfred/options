/**
 * @typedef {Object} Option
 * @property {string} [type = 'option'] || 'group'
 * @property {string} name - name of the option
 * @property {string|function} text - name of the option
 * @property {number} [min = 0]
 * @property {number} [max = 1]
 * @property {Object} options - suboptions
 * @property {bool} [hasIndividualChildren = false] - only if (type === 'option')
 * @property {Object} individualOptions - suboptions only if (hasIndividualChildren)
 * @property {bool} isChild
 * @property {Object} optionCurrency
 * @property {Object} childOptionCurrency
 * @property {function} test
 * @property {function} onIncrease
 * @property {function} onDecrease
 * @property {number|Object} cost
 * @property {number|function|Array|Object} discount
 */

const options = {
  planes: {
    name: 'Planes',
    max: -1,
    hasIndividualChildren: true,
    cost: {
      essence: 5,
    },
    childOptionCurrency: {
      planePoints: {
        name: 'Plane Points',
        value: 10,
      },
    },
    individualOptions: {
      essence: {
        name: 'Essence',
        max: -1,
        cost: {
          essence: 1,
          planePoints: -1,
        },
        discount: {
          // essence: function() {return - (getCount(this) ** 2 - 1);},
        },
      },
      scope: {
        name: 'Scope',
        type: 'group',
        options: {
          planet: {
            name: 'Planet',
            cost: {
              planePoints: 5,
            },
          },
          continent: {
            name: 'Continent',
            cost: {
              planePoints: 4,
            },
          },
          island: {
            name: 'Island',
            cost: {
              planePoints: 2,
            },
          },
        },
      },
    },
  },
  general: {
    type: 'group',
    name: 'General',
    max: -1,
    options: {
      immortality: {
        name: 'Immortality',
        cost: {
          essence: 5,
        },
      },
      keepMemories: {
        name: 'Keep memories',
        cost: {
          essence: 1,
        },
      },
      strength: {
        name: 'Strength',
        max: 10,
        cost: {
          essence: 1,
        },
      },
    }, 
  },
  simple: {
    name: 'Simple Option',
    cost: {
      essence: 1,
    },
  },
};

export default options;