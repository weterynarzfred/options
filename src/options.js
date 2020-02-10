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
 * @property {bool} isSynthetic
 * @property {Object} optionCurrency
 * @property {Object} childOptionCurrency
 * @property {function} test
 * @property {function} onIncrease
 * @property {function} onDecrease
 * @property {number|Object} cost
 * @property {number|function|Array|Object} discount
 */

import React from 'react';

const options = {
  intro: {
    type: 'story',
    name: 'Intro',
    text: <p>lorem ipsum</p>,
  },
  planes: {
    name: 'Planes',
    text: <p>Create some planes of existence.</p>,
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
          essence: data => data.index + 1,
          planePoints: -1,
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
      races: {
        name: 'Races',
        type: 'group',
        max: -1,
        options: {},
        functionalChildren: {},
        optionsFunction: data => {
          const races = {};
          for (const slug in data.options.races.selected) {
            const race = data.options.races.selected[slug];
            races[slug] = {
              name: race.name,
              cost: {
                planePoints: 1,
              },
            };
          }
          return races;
        },
      },
    },
  },
  races: {
    name: 'Races',
    // max: -1,
    hasIndividualChildren: true,
    cost: {
      essence: 3,
    },
    individualOptions: {
      simple: {
        name: 'Simple Option',
        cost: {
          essence: 1,
        },
      },
      face: {
        name: 'Face',
        type: 'group',
        max: 1,
        options: {
          humanoid: {
            name: 'Humanoid',
          },
          animal: {
            name: 'Animal',
          },
          alien: {
            name: 'Alien',
          },
        },
      }
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
        max: 3,
        cost: {
          essence: 1,
        },
      },
    }, 
  },
  simpleOptions: {
    type: 'story',
    name: 'Simple Options',
    text: <p>For testing purposes only.</p>,
  },
  simple: {
    name: 'Simple Option',
    cost: {
      essence: 1,
    },
  },
  simple2: {
    name: 'Simple Option 2',
    test: data => data.options.simple.selected,
    cost: {
      essence: 1,
    }
  },
};

export default options;