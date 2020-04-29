import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import isOptionDisabled from './functions/isOptionDisabled';

function select(arr, def = false) {
  for (const condition of arr) {
    if (condition[0]) return condition[1];
  }
  return def;
}

function _is(path) {
  const option = getOption(path, this.options);
  if (isOptionDisabled(option, this.options)) return false;
  return option.selected > 0;
}

function _val(path) {
  const option = getOption(path, this.options);
  if (isOptionDisabled(option, this.options)) return false;
  if (option.selected === undefined) {
    const selected = getSelected(option, this.options);
    if (selected.length === 0) return false;
    return selected[0].slug;
  }
  return option.selected;
}

function bindData(data) {
  return {
    is: _is.bind(data),
    val: _val.bind(data),
  };
}

const options = {
  count: {
    name: 'Count',
    max: 5,
    options: {
      a: {
        name: 'A',
        options: {
          b: {
            name: 'B',
          },
        },
      },
    },
  },
  group: {
    name: 'Group',
    type: 'group',
    max: false,
    options: data => {
      const count = _val.call(data, 'count') + 1;
      const suboptions = {};
      for (let i = 0; i < count; i++) {
        suboptions[`option${i + 1}`] = {
          name: `Option ${i + 1}`,
        };
      }
      return suboptions;
    },
  },
  group2: {
    name: 'Group 2',
    type: 'group',
    min: 1,
    options: data => {
      const count = _val.call(data, 'count') + 1;
      const suboptions = {};
      for (let i = 0; i < count; i++) {
        suboptions[`option${i + 1}`] = {
          name: `Option ${i + 1}`,
        };
      }
      return suboptions;
    },
  },
  option: {
    name: 'Option',
    options: data => {
      const count = _val.call(data, 'count') + 1;
      const suboptions = {};
      for (let i = 0; i < count; i++) {
        suboptions[`option${i + 1}`] = {
          name: `Option ${i + 1}`,
        };
      }
      return suboptions;
    },
  },
  self: {
    name: 'Your New Self',
    type: 'story',
    text: <p>You will receive a new body. It will be healthy and void of any genetic defects.</p>,
  },
  age: {
    name: 'Age',
    type: 'group',
    text: <p>At what age will your new body be?</p>,
    min: 1,
    useImageOfSelected: true,
    options: {
      child: {
        name: 'Child',
        text: <p>Your soul will enter a body that would otherwise be a stillborn. Your parents will provide for your basic needs but you won't have much autonomy at first. Your mind and memory will be fully functional but you will have to adapt to your new body making you as clumsy as every other newborn.</p>,
        image: './example/age_child.jpg',
        cost: {
          gold: 1,
        },
      },
      teen: {
        name: 'Teen',
        text: <p>You will appear in a secluded area in a body similar to people around but not belonging to anyone in praticular. You will have a body of a child around 12 years old which will limit your strating strength and possibilities.</p>,
        image: './image/a03b831d9f2c4987a4a67df9fdc4fad7.jpg',
        selected: 1,
      },
      adult: {
        name: 'Adult',
        text: <p>You will appear in a secluded area in a body similar to people around but not belonging to anyone in praticular. You will have a body of a fully grown adult below 30 years of age.</p>,
        image: './example/age_adult.jpg',
        cost: {
          gold: 1,
        },
      },
    },
  },
  parents: {
    name: 'Parents',
    text: <p>Who will your parents be?</p>,
    type: 'group',
    image: './image/parents_random.jpg',
    test: data => _is.call(data, 'age/child'),
    showWhenDisabled: true,
    disabledText: <p>You need to be a newborn.</p>,
    min: 1,
    useImageOfSelected: true,
    options: {
      abandoned: {
        name: 'Abandoned',
        image: './example/area_orphanage.jpg',
        cost: {
          gold: -1,
        },
      },
      random: {
        name: 'Random',
        image: './image/parents_random.jpg',
        selected: 1,
      },
      high: {
        name: 'Hight Status',
        image: './image/3262c6bf9d049b604bcdb38facbed2c6.jpg',
        cost: {
          gold: 5,
        },
      },
      royalty: {
        name: 'Royalty',
        image: './image/761d5a41242919c542956586b92baaf5.jpg',
        cost: {
          gold: 10,
        },
      },
    },
  },
  body: {
    name: 'Physical Prowess',
    type: 'group',
    min: 1,
    options: {
      normal: {
        name: 'Normal Body',
        selected: 1,
      },
      peak: {
        name: 'Peak Human',
        cost: {
          gold: 2,
        },
      },
      heroic: {
        name: 'Heroic',
        cost: {
          gold: 5,
        },
      }
    },
  },
  uniqueRace: {
    name: 'Unique Race',
    text: <p>You can choose your body to have any biologicaly possible traits. Otherwise you have to choose one of the races present in your new world.</p>,
    image: './image/18952b9d9f90fab3ed3ff6a40abfd8dd.jpg',
    cost: {
      gold: 10,
    },
  },
  markings: {
    name: 'Foretold Mark',
    text: <p>Your body will bear a marking passed down in legends. It won't do anything except changing people's perception of you. The mark will be possible to hide with some effort.</p>,
    type: 'group',
    image: './image/ee73f0b46e3653303deccc7f70c9b44b.jpg',
    useImageOfSelected: true,
    options: {
      saviour: {
        name: 'Mark of the Saviour',
        image: './image/celestial_by_ajgiel_d9456vi-fullview.jpg',
        cost: {
          gold: 2,
        },
      },
      demigod: {
        name: 'Mark of the Demigod',
        image: './image/ee73f0b46e3653303deccc7f70c9b44b.jpg',
        cost: {
          gold: 5,
        },
      },
      doom: {
        name: 'Mark of Doom',
        image: './image/tony-maverick-.jpg',
        cost: {
          gold: 2,
        },
      },
    },
  },
  yourMagic: {
    name: 'Magic',
    type: 'group',
    test: data => {
      return !['none', false].includes(_val.call(data, 'magicFrequency'));
    },
    min: 1,
    options: {
      none: {
        name: 'None',
        text: <React.Fragment><p>You won't be able to wield the magic of your new world no matter what.</p><p>Gained gold depends on the frequency of people with access to magic.</p></React.Fragment>,
        cost: {
          gold: data => -select([
            [_is.call(data, 'magicFrequency/few'), 1],
            [_is.call(data, 'magicFrequency/rare'), 2],
            [_is.call(data, 'magicFrequency/common'), 5],
            [_is.call(data, 'magicFrequency/half'), 10],
            [_is.call(data, 'magicFrequency/everyone'), 15],
          ]),
        },
      },
      same: {
        name: 'Same as Inhabitants',
        text: <p>You will have the same chance of being able to use magic as every other denizen of your new world.</p>,
        selected: 1,
      },
      guaranteed: {
        name: 'Guaranteed',
        text: <React.Fragment><p>You will be guaranteed to have the strongest form of magic possible on your new world.</p><p>Cost depends on the frequency of people with access to magic.</p></React.Fragment>,
        cost: {
          gold: data => select([
            [_is.call(data, 'magicFrequency/few'), 15],
            [_is.call(data, 'magicFrequency/rare'), 10],
            [_is.call(data, 'magicFrequency/common'), 5],
            [_is.call(data, 'magicFrequency/half'), 2],
            [_is.call(data, 'magicFrequency/everyone'), 1],
          ]),
        },
      },
    },
  },
  uniqueMagic: {
    name: 'Unique Magic',
    image: './example/__original_drawn_by_shell_wwwtrista__678e4146199ced72171b10e542dbd660.png',
    cost: {
      gold: 25,
    },
  },
  world: {
    name: 'Your New World',
    type: 'story',
  },
  species: {
    name: 'Sapient Species',
    type: 'group',
    min: 1,
    options: {
      none: {
        name: 'None',
        cost: {
          gold: -10,
        },
      },
      humans: {
        name: 'Humans',
        selected: 1,
      },
      fantasy: {
        name: 'Fantasy Species',
        cost: {
          gold: 5,
        },
      },
      custom: {
        name: 'Custom',
        cost: {
          gold: 10,
        },
      },
    },
  },
  geography: {
    name: 'Geography',
    type: 'group',
    useImageOfSelected: true,
    min: 1,
    options: {
      island: {
        name: 'Island',
        image: './image/23qs9qpfeuj11.jpg',
      },
      world: {
        name: 'World',
        selected: 1,
        image: './image/d5d17is-35153865-066b-4228-b85b-c8f83d573504.jpg',
      },
      megaWorld: {
        name: 'Mega World',
        image: './image/ringworld.jpg',
        test: data => _is.call(data, 'technology/nearFuture'),
        showWhenDisabled: true,
        disabledText: <p>Technology level has to be "near future"</p>,
      },
    },
  },
  technology: {
    name: 'Technology',
    type: 'group',
    test: data => !_is.call(data, 'species/none'),
    min: 1,
    options: {
      prehistoric: {
        name: 'Prehistoric',
      },
      stoneAge: {
        name: 'Stone Age',
      },
      agricultural: {
        name: 'Agricultural',
      },
      bronzeAge: {
        name: 'Bronze Age',
      },
      ironAge: {
        name: 'Iron Age',
      },
      ancient: {
        name: 'Ancient',
      },
      medieval: {
        name: 'Medieval',
        selected: 1,
      },
      industrial: {
        name: 'Industrial',
      },
      modern: {
        name: 'Modern',
      },
      nearFuture: {
        name: 'Near Future',
      },
    },
  },
  magicFrequency: {
    name: 'Magic Frequency',
    text: <p>How many sapient creatures on your new world will be able to use magic?</p>,
    type: 'group',
    test: data => !_is.call(data, 'species/none'),
    min: 1,
    options: {
      none: {
        name: 'None',
        text: <p>There is no magic at all.</p>,
        selected: 1,
      },
      few: {
        name: 'Very Few',
        text: <p>There will be only a handfull of people with access to magic.</p>,
      },
      rare: {
        name: 'Rare',
        text: <p>Magic will be rare, only about 0.001% of population will have access to it.</p>,
      },
      common: {
        name: 'Common',
        text: <p>About one in twenty people will have access to magic.</p>,
      },
      half: {
        name: 'Half',
      },
      everyone: {
        name: 'Mostly Everyone',
      },
    },
  },
  magicPower: {
    name: 'Magic Power',
    text: <p>How powerfull will the magic be?</p>,
    type: 'group',
    test: data => !_is.call(data, 'species/none') && !_is.call(data, 'magicFrequency/none'),
    options: {
      convenience: {
        name: 'Convenience',
      },
      heroic: {
        name: 'Heroic',
      },
      powerfull: {
        name: 'Powerfull',
      },
      worldShattering: {
        name: 'World Shattering',
      },
    },
  },
};

export default options;
