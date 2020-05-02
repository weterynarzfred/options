import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import isOptionDisabled from './functions/isOptionDisabled';
import introImg from './media/element/intro.jpg';
import NextStage from './containers/NextStage';

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

function roll(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _is(path, values, prepend = 'options/') {
  const option = getOption(prepend + path, this.options);
  if (isOptionDisabled(option, this.options)) return false;
  if (values === undefined) {
    return option.selected > 0;
  }
  return values.includes(_val.call(this, option));
}

function _isnt(path, values, prepend = 'options/') {
  return !values.includes(_val.call(this, path, prepend));
}

function _val(path, prepend = 'options/') {
  let option;
  if (typeof path === 'string') {
    option = getOption(prepend + path, this.options);
  }
  else {
    option = path;
  }
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
    isnt: _isnt.bind(data),
    val: _val.bind(data),
  };
}

const options = {
  options: {
    name: 'Options',
    type: 'optionsContainer',
    options: {
      intro: {
        name: 'A quick trip',
        type: 'story',
        text: <React.Fragment>
          <p>Due to some disturbances in spacetime you were ripped out of your reality. Your soul is currently hovering in an endless void. You have no senses to feel anything yet you realize you can steer yourself to any of the myriad of realities scattered around you. Each one of them branching into countless others. In what world will you end up depends solely on your choices.</p>
        </React.Fragment>,
        image: introImg,
        classes: ['intro'],
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
        text: <p>What king of sapient creatures will inhabit the world?</p>,
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
            text: <p>Assortment of standard fantasy races.</p>,
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
      population: {
        name: 'Population',
        type: 'group',
        min: 1,
        disableOpenButton: true,
        options: {
          sparselyPopulated: {
            name: 'Sparsely Populated',
          },
          mediumPopulation: {
            name: 'Medium Population',
            selected: 1,
          },
          denslyPopulated: {
            name: 'Densly Populated',
            test: data => _is.call(data, 'technology', ['ancient', 'medieval', 'industrial', 'modern', 'nearFuture']),
            showWhenDisabled: true,
            disabledText: <p>Technology level has to be at least ancient.</p>,
          },
        },
      },
      balanceOfPower: {
        name: 'Balance of Power',
        type: 'group',
        text: <p>What are the realtions between races, countries and people?</p>,
        test: data => _isnt.call(data, 'species', ['none', false]),
        min: 1,
        options: {
          idyll: {
            name: 'Idyll',
            text: <p>Mostly everyone lives in peace with themselves and each other. War and conflict practically does not exist.</p>,
            cost: {
              gold: 10,
            },
          },
          balanced: {
            name: 'Balanced',
            text: <p>Forces of races and great nations exist in an equilibrium where everyone is discouraged from atacking each other. It doesn't seem like anything will change this balance anytime soon. This means conflicts on large scale are very rare.</p>,
            cost: {
              gold: 5,
            },
          },
          natural: {
            name: 'Natural',
            text: <p>Similar to your previous world. Conflicts happen aplenty but usually, majority of the population manages to get by.</p>,
            selected: 1,
          },
          strained: {
            name: 'Strained',
            text: <p>The world is on a verge of a revolution of some sort. When the war finally breaks out it will change the societal ladscape of the world.</p>,
            cost: {
              gold: -5,
            },
          },
          hellish: {
            name: 'Hellish',
            text: <p>War is the default state of the world. Most of each country's budget is spent on warfare or repairing war losses. Alliances and peace are possible but will require significant effort.</p>,
            cost: {
              gold: -10,
            },
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
          feared: {
            name: 'Feared',
            test: data => !_is.call(data, 'magicFrequency/everyone'),
            showWhenDisabled: true,
            disabledText: <p>Mages cannot be feared if everyone is a mage.</p>,
          },
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
      // proceed: {
      //   name: 'Proceed',
      //   type: 'story',
      //   text: <React.Fragment>
      //     <p>Nothing more to see here. Move along. Magic exists and is use like any other resource. Magic exists and is use like any other resource.</p>
      //     <NextStage
      //       target="epilogue"
      //       text="show the summary"
      //     />
      //   </React.Fragment>,
      // },
    },
  },
  epilogue: {
    name: 'Epilogue',
    type: 'optionsContainer',
    options: {
      epilogue: {
        name: 'Epilogue',
        type: 'story',
        text: data => {
          const { is, isnt, val } = bindData(data);
          const g = data.settings.currency.gold.currentValue;
          const familyDesc = select([
            [is('parents/abandoned'), `, your parents abandoned you at birth. You will grow up in an orphanage.`],
            [is('parents/random'), ` of a ${roll(3)} family.`],
            [is('parents/highStatus'), ` of a family with a fairly high status in the society.`],
            [is('parents/royalty'), ` of a royal family of one of the countries in your new world.`],
          ]);
          const f = [
            select([
              [g > 0, `You have ${g} gold left.`],
              [g < 0, `You are ${g} gold in debt.`],
            ], `You have spent all of your gold.`),
            select([
              [is('age/child'), `You are a newborn child${familyDesc}`],
              [is('age/teen'), `You are a child around 12 years old.`],
              [is('age/adult'), `You are an adult in their prime.`],
            ]),
          ];
          return <React.Fragment>
            <p>{f.join(' ')}</p>
            <NextStage
              target="options"
              text="go back"
            />
          </React.Fragment>
        },
      },
    },
  },
};

export default options;
