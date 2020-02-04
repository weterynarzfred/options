/**
 * @typedef {Object} Option
 * @property {string} [type = 'option'] || 'group'
 * @property {string} name - name of the option
 * @property {string|function} text - name of the option
 * @property {number} [min = 0]
 * @property {number} [max = 1]
 * @property {Object} options - suboptions
 * @property {bool} [individualChildren = false] - only if (type === 'option')
 * @property {Object} individualOptions - suboptions only if (individualChildren)
 * @property {bool} isChild
 * @property {Object} optionCurrency
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
    individualChildren: true,
    cost: {
      essence: 5,
    },
    optionCurrency: {
      planePoints: 10,
    },
    individualOptions: {
      essence: {
        name: 'Essence',
        max: -1,
        cost: {
          essence: 1,
          planetPoints: -1,
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
              planetPoints: 5,
            },
          },
          continent: {
            name: 'Continent',
            cost: {
              planetPoints: 4,
            },
          },
          island: {
            name: 'Island',
            cost: {
              planetPoints: 2,
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
};

export default options;