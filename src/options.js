import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import isOptionDisabled from './functions/isOptionDisabled';
import introImg from './media/element/intro.jpg';

function importAll(r) {
  const obj = {};
  r.keys().map(r).forEach((element, i) => {
    const name = element.split('/').pop().split('.')[0];
    obj[name] = element;
  });
  return obj;
}

let images = {};
try {
  images = importAll(require.context('./media/image_scaled', false, /\.(png|jpe?g|svg|gif)$/));
} catch (error) { }

export { images };



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

function _isnt(path, values) {
  return !values.includes(_val.call(this, path));
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

// function bindData(data) {
//   return {
//     is: _is.bind(data),
//     isnt: _isnt.bind(data),
//     val: _val.bind(data),
//   };
// }

const options = {
  intro: {
    name: 'A quick trip',
    type: 'story',
    text: <React.Fragment>
      <p>Due to some disturbances in spacetime you were ripped out of your reality. Your soul is currently hovering in an endless void. You have no senses to feel anything yet you realize you can steer yourself to any of the myriad of realities scattered around you. Each one of them branching into countless others. In what world will you end up depends solely on your choices.</p>
    </React.Fragment>,
    image: introImg,
    classes: ['intro'],
  },
  count: {
    name: 'Count',
    max: 5,
    options: {
      a: {
        name: 'A',
        cost: {
          gold: data => _val.call(data, 'count/c'),
        },
        options: {
          b: {
            name: 'B',
          },
        },
      },
      c: {
        name: 'C',
        max: false,
      },
    },
  },
  parent: {
    name: 'Parent',
    max: false,
    hasIndividualChildren: true,
    defaultChildName: 'Child',
    individualOptions: {
      cute: {
        name: 'Cute',
      }
    },
    classes: ['double'],
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
    disableOpenButton: true,
    options: {
      child: {
        name: 'Child',
        text: <p>Your soul will enter a body that would otherwise be a stillborn. Your parents will provide for your basic needs but you won't have much autonomy at first. Your mind and memory will be fully functional but you will have to adapt to your new body making you as clumsy as every other newborn.</p>,
        imageCx: 30,
        cost: {
          gold: 1,
        },
      },
      teen: {
        name: 'Teen',
        text: <p>You will appear in a secluded area in a body similar to people around but not belonging to anyone in praticular. You will have a body of a child around 12 years old which will limit your strating strength and possibilities.</p>,
        selected: 1,
      },
      adult: {
        name: 'Adult',
        text: <p>You will appear in a secluded area in a body similar to people around but not belonging to anyone in praticular. You will have a body of a fully grown adult below 30 years of age.</p>,
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
    test: data => _is.call(data, 'age/child'),
    image: images.parents_random,
    min: 1,
    disableOpenButton: true,
    options: {
      abandoned: {
        name: 'Abandoned',
        cost: {
          gold: -1,
        },
      },
      random: {
        name: 'Random',
        selected: 1,
      },
      highStatus: {
        name: 'Hight Status',
        cost: {
          gold: 5,
        },
      },
      royalty: {
        name: 'Royalty',
        cost: {
          gold: 10,
        },
      },
    },
  },
  body: {
    name: 'Physical Prowess',
    type: 'group',
    disableOpenButton: true,
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
        imageCy: 0,
        cost: {
          gold: 5,
        },
      },
      focus: {
        name: 'Focus',
        text: <p>To which type will your body belong? This affects your looks and abilities both initial and the natural tendency of your body.</p>,
        type: 'group',
        min: 1,
        test: data => _isnt.call(data, 'body', ['normal', false]),
        disableOpenButton: true,
        options: {
          agility: {
            name: 'Agility',
          },
          balanced: {
            name: 'Balanced',
            selected: 1,
          },
          strength: {
            name: 'Strength',
          },
        },
      },
    },
  },
  uniqueRace: {
    name: 'Unique Race',
    text: <p>You can choose your body to have any biologicaly possible traits. Otherwise you have to choose one of the races present in your new world.</p>,
    cost: {
      gold: 10,
    },
  },
  markings: {
    name: 'Foretold Mark',
    text: <p>Your body will bear a marking passed down in legends. It won't do anything except changing people's perception of you. The mark will be possible to hide with some effort.</p>,
    type: 'group',
    image: images.markings_demigod,
    disableOpenButton: true,
    options: {
      saviour: {
        name: 'Mark of the Saviour',
        cost: {
          gold: 2,
        },
      },
      demigod: {
        name: 'Mark of the Demigod',
        cost: {
          gold: 5,
        },
      },
      doom: {
        name: 'Mark of Doom',
        cost: {
          gold: 2,
        },
      },
    },
  },
  yourMagic: {
    name: 'Magic',
    type: 'group',
    test: data => _isnt.call(data, 'magicFrequency', ['none', false]),
    min: 1,
    disableOpenButton: true,
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
    disableOpenButton: true,
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
    disableOpenButton: true,
    min: 1,
    options: {
      island: {
        name: 'Island',
      },
      world: {
        name: 'World',
        selected: 1,
      },
      megaWorld: {
        name: 'Mega World',
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
    disableOpenButton: true,
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
    disableOpenButton: true,
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
    disableOpenButton: true,
    min: 1,
    options: {
      convenience: {
        name: 'Convenience',
        selected: 1,
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
  magicSituation: {
    name: 'Situation of Mages',
    type: 'group',
    min: 1,
    test: data => _isnt.call(data, 'magicFrequency', ['none', false]),
    disableOpenButton: true,
    options: {
      hidden: {
        name: 'Hidden',
        test: data => !_is.call(data, 'magicFrequency/everyone'),
        showWhenDisabled: true,
        disabledText: <p>Mages cannot be hidden if everyone is a mage.</p>,
      },
      casual: {
        name: 'Casual',
        text: <p>Magic exists and is use like any other resource.</p>,
        selected: 1,
      },
      revered: {
        name: 'Revered',
      },
      worshipped: {
        name: 'Worshipped',
      },
    },
  },
};

export default options;
