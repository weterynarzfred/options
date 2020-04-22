import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';

function select(arr, def = false) {
  for (const condition of arr) {
    if (condition[0]) return condition[1];
  }
  return def;
}

function _is(path) {
  const option = getOption(path, this.options);
  return option.selected > 0;
}

function _val(path) {
  const option = getOption(path, this.options);
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
  world: {
    name: 'Your New World',
    type: 'story',
  },
  test: {
    name: 'Test',
    options: {
      test: {
        name: 'Test',
      },
    },
  },
  species: {
    name: 'Species',
  },
  geography: {
    name: 'Geography',
    type: 'group',
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
      newborn: {
        name: 'Newborn',
        text: <p>Your soul will enter a body that would otherwise be a stillborn. Your parents will provide for your basic needs but you won't have much autonomy at first. Your mind and memory will be fully functional but you will have to adapt to your new body making you as clumsy as every other newborn.</p>,
        cost: {
          gold: 1,
        },
      },
      child: {
        name: 'Child',
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
    test: data => _is.call(data, 'age/newborn'),
    showWhenDisabled: true,
    disabledText: <p>You need to be a newborn.</p>,
    min: 1,
    useImageOfSelected: true,
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
      high: {
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
  uniqueRace: {
    name: 'Unique Race',
    text: <p>You can choose your body to have any biologicaly possible traits. Otherwise you have to choose one of the races prasent in your new world.</p>,
    cost: {
      gold: 10,
    },
  },
  markings: {
    name: 'Foretold Mark',
    text: <p>Your body will bear a marking passed down in legends. It won't do anything except changing people's perception of you. The mark will be placed somewhere fairly easy to hide if you wish to.</p>,
    type: 'group',
    options: {
      saviour: {
        name: 'Mark of the Saviour',
      },
      demigod: {
        name: 'Mark of the Demigod',
        cost: {
          gold: 2,
        },
      },
      doom: {
        name: 'Mark of Doom',
      },
    },
  },
  yourMagic: {
    name: 'Magic',
    type: 'group',
    min: 1,
    // test: data => ,
    options: {
      none: {
        name: 'None',
        text: <p>You won't be able to wield magic no matter what.</p>,
      },
      same: {
        name: 'Same as Inhabitants',
        text: <p>You will have the same chance of bwing able to use magic as every other denizen of your new world.</p>,
        selected: 1,
      },
      guaranteed: {
        name: 'Guaranteed',
        text: <p>You will be guaranteed to have the strongest form of magic possible on your new world.</p>,
      },
    },
  },
};

export default options;
