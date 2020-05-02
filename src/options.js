import React from 'react';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import isOptionDisabled from './functions/isOptionDisabled';
// import introImg from './media/element/intro.jpg';

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

// function select(arr, def = false) {
//   for (const condition of arr) {
//     if (condition[0]) return condition[1];
//   }
//   return def;
// }

// function _is(path, values) {
//   const option = getOption(path, this.options);
//   if (isOptionDisabled(option, this.options)) return false;
//   if (values === undefined) {
//     return option.selected > 0;
//   }
//   return values.includes(_val.call(this, option));
// }

// function _isnt(path, values) {
//   return !values.includes(_val.call(this, path));
// }

function _val(path) {
  let option;
  if (typeof path === 'string') {
    option = getOption(path, this.options);
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

// function bindData(data) {
//   return {
//     is: _is.bind(data),
//     isnt: _isnt.bind(data),
//     val: _val.bind(data),
//   };
// }

const options = {
  main: {
    name: 'Main',
    type: 'optionsContainer',
    options: {
      count: {
        name: 'Count',
        max: 5,
        cost: {
          gold: 1,
        },
      },
      group: {
        name: 'Group',
        disableOpenButton: true,
        options: data => {
          const count = _val.call(data, 'main/count');
          const children = {};
          for (let i = 0; i < count; i++) {
            children[`option${i}`] = {
              name: `Option ${i + 1}`,
              cost: {
                gold: i + 1,
              },
            };
          }
          return children;
        },
      },
      group2: {
        name: 'Group 2',
        options: {
          group: {
            name: 'Group',
            type: 'group',
            options: {
              a: {
                name: 'A',
                selected: 1,
              },
              b: {
                name: 'B',
                selected: 1,
              },
            },
          },
        },
      },
      next: {
        name: 'Proceed',
        type: 'story',
        includeNextStage: 'other',
      },
    },
  },
  other: {
    name: 'Other',
    type: 'optionsContainer',
    options: {
      group: {
        name: 'Group',
        type: 'group',
        options: {
          a: {
            name: 'A',
            selected: 1,
          },
          b: {
            name: 'B',
            selected: 1,
          },
        },
      },
    },
  },
};

export default options;
