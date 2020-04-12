/**
 * @typedef {Object} Option
 * @property {string} [type = 'option'] || 'group'
 * @property {string} name - name of the option
 * @property {string|function} text - text of the option
 * @property {number} [min = 0]
 * @property {number} [max = 1]
 * @property {Object} options - suboptions
 * @property {bool} [hasIndividualChildren = false] - only if (type === 'option')
 * @property {Object} individualOptions - suboptions, only if (hasIndividualChildren)
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
import { calculateCurrency } from './components/CurrencyStats';
import { optionsFromChildren } from './functions/helpers';
import { getSelectedCount } from './functions/getSelected';
import isPathActive from './functions/isPathActive';

const options = {
  intro: {
    type: 'story',
    name: 'Intro',
    text: <p>lorem ipsum</p>,
  },
  planeTravel: {
    name: 'Travel between planes',
    type: 'group',
    max: false,
    test: data => getSelectedCount(data.options.planes, data.options) >= 2,
    options: {
      portals: {
        name: 'Portals',
        cost: {
          essence: 1,
        },
      },
      teleportation: {
        name: 'Teleportation',
        cost: {
          essence: 5,
        },
      },
    },
  },
  planes: {
    name: 'Planes',
    text: data => {
      const count = getSelectedCount(data.option, data.options);
      const texts = [
        `You have ${count} ${count === 1 ? 'plane' : 'planes'} created.`,
      ];
      return <p>Create some planes of existence. {texts[0]}</p>;
    },
    image: './media/starting_point.jpg',
    max: false,
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
      planePoints: {
        name: 'Plane Points',
        max: false,
        cost: {
          essence: data => data.index + 1,
          planePoints: -1,
        },
      },
      scope: {
        name: 'Scope',
        type: 'group',
        min: 1,
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
        image: './media/food_homemade.jpg',
        type: 'group',
        max: false,
        optionsFunction: data => optionsFromChildren(data.options.races, (result, child) => {
          result.cost = {
            planePoints: data => -calculateCurrency(
              child.options,
              data.options.races.childOptionCurrency,
              data.options
            ).raceCost.value,
          };
          return result;
        }),
      },
    },
  },
  races: {
    name: 'Races',
    image: './media/food_homemade.jpg',
    hasIndividualChildren: true,
    max: false,
    cost: {
      essence: 3,
    },
    childOptionCurrency: {
      raceCost: {
        name: 'Race Cost',
        value: 0,
        min: false,
      },
    },
    individualOptions: {
      cute: {
        name: 'Cute',
        selected: 1,
        cost: {
          raceCost: 5,
        },
      },
      tail: {
        name: 'Tail',
        text: <p>They get a sexy tail.</p>,
        image: './media/tail.jpg',
        cost: {
          raceCost: 1,
        },
      },
      horns: {
        name: 'horns',
        image: './media/horns.jpg',
        cost: {
          raceCost: 1,
        },
      },
      face: {
        name: 'Face',
        type: 'group',
        min: 1,
        max: 1,
        options: {
          humanoid: {
            name: 'Humanoid',
            cost: {
              raceCost: 2,
            },
          },
          animal: {
            name: 'Animal',
            image: './media/face_bestial.jpg',
            cost: {
              raceCost: 1,
            },
          },
          alien: {
            name: 'Alien',
            cost: {
              raceCost: 1,
            },
          },
        },
      },
    },
  },
  general: {
    name: 'General',
    type: 'group',
    image: './media/area_lakes.jpg',
    max: false,
    options: {
      immortality: {
        name: 'Immortality',
        cost: {
          essence: 5,
        },
      },
      strength: {
        name: 'Strength',
        max: 3,
        cost: {
          essence: 1,
        },
      },
      magic: {
        name: 'Magic',
        cost: {
          essence: 1,
        },
        options: {
          portals: {
            name: 'Portals',
            test: data => isPathActive('planeTravel/portals', data.options),
            cost: {
              essence: 1,
            },
          },
          fireball: {
            name: 'Fireball',
            text: <p>It had to be here, didn't it.</p>,
            cost: {
              essence: 1,
            },
          },
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