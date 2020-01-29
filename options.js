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
          essence: function() {return - (getCount(this) ** 2 - 1);},
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
    name: 'Genreal',
    max: -1,
    options: {
      immortality: {
        name: 'Immortality',
        cost: {
          essence: 5,
        },
      }
    }, 
  }
};

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

function getOption(path) {
  if (typeof path === 'object') return path;
  path = path.split('/').reverse();
  let option = {options};
  while (path.length) {
    if (typeof option.selected === 'object' && option.selected[path[path.length - 1]] !== undefined) {
      option = option.selected[path.pop()];
    }
    else {
      option = option.options[path.pop()];
    }
  }
  return option;
}

function getCount(option) {
  option = getOption(option);
  if (option.selected === undefined) return 0;
  if (option.selected.length === undefined) return option.selected;
  return option.selected.length;
}

function buyOption(option) {
  option = getOption(option);
  if (option.type === 'group') return false;
  if (option.individualChildren) {
    if (option.selected === undefined) {
      option.selected = [];
    }
    const child = {
      type: 'child',
      name: option.name + ' - ' + option.selected.length,
      options: clone(option.individualOptions),
    };
    option.selected.push(child);
    return child;
  }
  else {
    if (option.selected === undefined) {
      option.selected = 0;
    }
    option.selected++;
  }
}

function getSelected(options) {
  const selected = [];
  for (const slug in options) {
    console.log(slug);
    
    const option = options[slug];
    if (option.type !== 'group') {
      if (option.selected !== undefined) {
        if (typeof option.selected === 'object') {
          for (const child of option.selected) {
            selected.push(child);
            selected.push(...getSelected(child.options));
          }
        }
        else {
          for (let i = 0; i < option.selected; i++) {
            selected.push(option);
          }
        }
      }
    }
    if (option.options !== undefined) {
      selected.push(...getSelected(option.options));
    }
  }
  return selected;
}

buyOption('general/immortality');
const plane1 = buyOption('planes');
buyOption('planes');
buyOption('planes/1/essence');
buyOption('planes/1/essence');
buyOption('planes/1/scope/island');
console.log(getSelected(options));
