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
  teammates: {
    name: 'Teammates',
    hasIndividualChildren: true,
    defaultChildName: 'Teammate',
    max: 5,
    individualOptions: {
      race: {
        name: 'Race',
        type: 'group',
        min: 1,
        options: {
          human: {
            name: 'Human',
          },
          elf: {
            name: 'Elf',
          },
          dwarf: {
            name: 'Dwarf',
          },
          driad: {
            name: 'Driad',
          },
        },
      },
    },
  },
  perks: {
    name: 'Perks',
    type: 'group',
    text: <p>Dicta atque asperiores exercitationem modi id! Soluta nisi ut voluptates temporibus quod dolore necessitatibus labore minima. Odio id eos molestias repudiandae, veniam error soluta laboriosam cumque perferendis tempore corrupti numquam?</p>,
    max: false,
    options: {
      counterspell: {
        name: 'Counterspell',
        text: <p>Quo asperiores recusandae, quasi inventore eius quia excepturi maiores ipsum dolore laborum id maxime sequi. Repellendus magnam voluptatum molestiae animi sequi quidem saepe, veniam odio vero. Voluptas numquam possimus fugiat?</p>,
        image: './image/stf99_Counterspell.jpg',
        cost: {
          gold: 3,
        },
      },
      saveSlot: {
        name: 'Save Slot',
        max: 3,
        text: <p>Libero officiis fugit nesciunt nemo voluptatum quaerat nihil iure voluptates. A perferendis libero, obcaecati ullam sunt consequuntur distinctio nisi odio reprehenderit. Iste autem modi eaque quisquam facilis eos voluptate ea.</p>,
        image: './image/ed77b54d2bb5ec1625186e24d84f4ac7.jpg',
      },
      detection: {
        name: 'Magic Detection',
        text: <p>Deleniti sint, totam ullam dicta quos voluptatum, sequi similique placeat, non necessitatibus laboriosam molestias expedita vero. Magnam nulla perspiciatis laborum quos, architecto ex reiciendis quisquam nisi suscipit quo illo eaque.</p>,
      },
      elemental: {
        name: 'Elemental Magic',
        type: 'group',
        text: <p>Impedit soluta velit voluptatem magni rem quia quisquam. Animi praesentium accusantium quibusdam recusandae tempora dolores ex molestias dolorum porro aliquam, a aliquid illum. Molestias ab amet aut est aspernatur dolores.</p>,
        options: {
          fire: {
            name: 'Fire',
            text: <p>Eos incidunt voluptatum adipisci quas beatae illum sunt aut. Eveniet, sapiente totam adipisci illo quaerat blanditiis reprehenderit similique voluptatem. Odit consequatur iste ullam ratione labore cum mollitia omnis modi voluptatibus.</p>,
          },
          water: {
            name: 'Water',
            text: <p>Inventore quas nulla praesentium aspernatur tempora nam, minus iste exercitationem voluptatem. Minima hic est rem? Sed eveniet fugit natus placeat minus nisi beatae deleniti labore, ut dolorem ab, laboriosam consequatur.</p>,
          },
          nature: {
            name: 'Nature',
            text: <p>Harum dignissimos tenetur numquam vel blanditiis dolorum ab eum, quasi placeat tempore veniam asperiores fugit minima impedit velit ex dicta praesentium odio in? Hic maxime deserunt fugit itaque! Delectus, magnam?</p>,
          },
        },
      },
    },
  },
  perks2: {
    name: 'Perks 2',
    type: 'group',
    text: <p>Dicta atque asperiores exercitationem modi id! Soluta nisi ut voluptates temporibus quod dolore necessitatibus labore minima.</p>,
    max: false,
    options: {
      counterspell: {
        name: 'Counterspell',
        text: <p>Quo asperiores recusandae, quasi inventore eius quia excepturi maiores ipsum dolore laborum id maxime sequi. Repellendus magnam voluptatum molestiae animi sequi quidem saepe, veniam odio vero. Voluptas numquam possimus fugiat?</p>,
        cost: {
          gold: 3,
          grace: 1,
        },
        optionCurrency: {
          silver: {
            name: 'Silver',
            value: 15,
          },
        },
      },
      saveSlot: {
        name: 'Save Slot',
        max: false,
        type: 'group',
        optionCurrency: {
          silver: {
            name: 'Silver',
            value: 15,
          },
        },
      },
      detection: {
        name: 'Magic Detection',
        type: 'group',
        max: false,
        text: <p>Deleniti sint, totam ullam dicta quos voluptatum, sequi similique placeat, non necessitatibus laboriosam molestias expedita vero. Magnam nulla perspiciatis laborum quos, architecto ex reiciendis quisquam nisi suscipit quo illo eaque.</p>,
      },
      elemental: {
        name: 'Elemental Magic',
        type: 'group',
        text: <p>Impedit soluta velit voluptatem magni rem quia quisquam. Animi praesentium accusantium quibusdam recusandae tempora dolores ex molestias dolorum porro aliquam, a aliquid illum. Molestias ab amet aut est aspernatur dolores.</p>,
        useImageOfSelected: true,
        options: {
          fire: {
            name: 'Fire',
            text: <p>Eos incidunt voluptatum adipisci quas beatae illum sunt aut. Eveniet, sapiente totam adipisci illo quaerat blanditiis reprehenderit similique voluptatem. Odit consequatur iste ullam ratione labore cum mollitia omnis modi voluptatibus.</p>,
            image: './image/fujihara-fujihara-fire-tornado2.jpg',
            cost: {
              gold: 1,
            },
          },
          water: {
            name: 'Water',
            text: <p>Inventore quas nulla praesentium aspernatur tempora nam, minus iste exercitationem voluptatem. Minima hic est rem? Sed eveniet fugit natus placeat minus nisi beatae deleniti labore, ut dolorem ab, laboriosam consequatur.</p>,
          },
          nature: {
            name: 'Nature',
            text: <p>Harum dignissimos tenetur numquam vel blanditiis dolorum ab eum, quasi placeat tempore veniam asperiores fugit minima impedit velit ex dicta praesentium odio in? Hic maxime deserunt fugit itaque! Delectus, magnam?</p>,
          },
        },
      },
    },
  },
  inventory: {
    name: 'Invetory',
    type: 'group',
    options: {
      elixirs: {
        name: 'Elixirs',
        hasIndividualChildren: true,
        defaultChildName: 'Elixir',
        text: <p>Each elixir is one use only but the same effect can be selected multiple times.</p>,
        max: 5,
        individualOptions: {
          effect: {
            name: 'Effect',
            type: 'group',
            min: 1,
            options: {
              love: {
                name: 'Love Potion',
                text: <p>Whoever drinks this will fall in love with you.</p>,
                selected: 1,
              },
              perfection: {
                name: 'Perfection',
                text: <p>Whoever drinks this will have their body slowly transformed as close to their ideal self as possible while still being recognized as the same pernom by ones who knew them. Does not heal diseases.</p>,
              },
              cure: {
                name: 'Cure',
                text: <p>Heals any and all diseases and cleanses of all toxins but cannot help to injuries. Will work up to 60 seconds after death</p>,
              },
              truth: {
                name: 'Potion of truth',
                text: <p>Whoever drinks this will involuntarily answer any questions posed to them to the best of their ability for the next hour.</p>,
              },
            },
          },
          undetectable: {
            name: 'Undetectable',
            text: <p>The potion will be tastless, odorless, trasparent and will easily mix into almost any food.</p>,
          }
        },
      },
      artifacts: {
        name: 'Artifacts',
        type: 'group',
        max: false,
        options: {
          wand: {
            name: 'Wand',
          },
          dragon: {
            name: 'Dragon\'s egg',
          },
        },
      },
    },
  },
  body: {
    name: 'Body',
    type: 'story',
    text: data => {
      const { is, val } = bindData(data);
      const cute = is('cuteness') ? ' a cute looking' : ' an average looking';
      const gender = select([
        [is('gender/male'), val('age') > 15 ? 'man' : 'boy'],
        [is('gender/female'), val('age') > 15 ? 'woman' : 'girl'],
      ], 'blank slate');
      const complexion = is('freckles') ? (select([
        [is('complexion/dark'), ' You have freckles but they are hardly visible with your dark complexion.'],
        [is('complexion/mild'), ' You have freckles and a mild complexion.'],
        [is('complexion/pale'), ' You have freckles clearly visible on your pale skin.'],
      ], ' You have freckles.')) : (val('complexion') ? select([
        [is('complexion/dark'), ' You have a dark skin.'],
        [is('complexion/mild'), ' You have mild complexion.'],
        [is('complexion/pale'), ' You have a pale skin.'],
      ]) : false);

      return <p>Choose from options below to specify your body. You are{cute} {gender}.{complexion}</p>
    },
  },
  gender: {
    name: 'Gender',
    type: 'group',
    min: 1,
    text: <p>Are you a boy or a girl?</p>,
    image: '',
    useImageOfSelected: true,
    options: {
      male: {
        name: 'Male',
        text: <p>You have male genitals, high testosterone, and all good things that come from being a man.</p>,
        image: './example/manly.jpg',
        cost: {
          gold: 1,
        },
        selected: 1,
      },
      female: {
        name: 'Female',
        text: <p>You have female genitals, round breasts and hips. Unfortunately you also experience periods.</p>,
        image: './example/teacher_ordinary.jpg',
        cost: {
          gold: 2,
        },
      },
    },
  },
  cuteness: {
    name: 'Cuteness',
    text: <p>Are you a <strong>qt<span style={{ fontSize: '1.25em' }}>&#x1D70B;</span></strong>?</p>,
    image: './example/__original_drawn_by_shell_wwwtrista__678e4146199ced72171b10e542dbd660.png',
    cost: {
      gold: 1,
      grace: -3,
    },
  },
  freckles: {
    name: 'Freckles',
    text: <p>Clusters of concentrated melaninized cells.</p>,
    image: './image/e0a3e482ffdf4274e41ef712b0d72d01.jpg',
    options: {
      face: {
        name: 'On your face',
        text: <p>Most of your freckles are concentrated on your face.</p>,
      },
      body: {
        name: 'On your whole body',
        text: <p>Freckles cover most of your body.</p>,
      },
    },
  },
  age: {
    name: 'Age',
    min: 12,
    max: 36,
    selected: 18,
    text: <p>How old are you?</p>,
    image: './example/age_normal.jpg',
  },
  complexion: {
    name: 'Complexion',
    type: 'group',
    min: 1,
    text: <p>How much melanin do you have in your skin?</p>,
    options: {
      dark: {
        name: 'Dark',
      },
      mild: {
        name: 'Mild',
        selected: 1,
      },
      pale: {
        name: 'Pale',
      },
    },
  },
  memory: {
    name: 'Eideic Memory',
    image: './image/811105069b3e593706e38d8225d102be.jpg',
  },
};

export default options;
