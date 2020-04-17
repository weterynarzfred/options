import React from 'react';
import { optionsFromChildren, checkIfPathSelected } from './functions/helpers';
import getSelectedCount from './functions/getSelectedCount';

const options = {
  intro: {
    type: 'story',
    name: 'Intro',
    text: () => <p>lorem ipsum</p>,
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
      time: -1,
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
        text: () => <p>Each point costs 1 essence more.</p>,
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
        link: 'races',
        max: false,
        optionsFunction: data => optionsFromChildren(data.options.races, (result, source) => {
          result.cost = {
            planePoints: -source.optionCurrency.raceCost.currentValue,
          };
          result.link = source.path;
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
        text: () => <p>They get a sexy tail.</p>,
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
    optionCurrency: {
      gold: {
        name: 'Gold',
        value: 5,
      },
    },
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
          gold: 1,
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
            test: data => checkIfPathSelected('planeTravel/portals', data.options),
            cost: {
              essence: 1,
            },
          },
          fireball: {
            name: 'Fireball',
            text: () => <p>It had to be here, didn't it.</p>,
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