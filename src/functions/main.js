// function clone(object) {
//   return JSON.parse(JSON.stringify(object));
// }

function getOption(path, options) {
  if (typeof path === 'object') {
    path = path.path;
  }
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

// function getCount(option) {
//   option = getOption(option);
//   if (option.selected === undefined) return 0;
//   if (option.selected.length === undefined) return option.selected;
//   return option.selected.length;
// }

export function buyOption(option, options) {
  // find selected option in the options object
  option = getOption(option, options);
  // if (option.type === 'group') return false;
  // if (option.individualChildren) {
  //   if (option.selected === undefined) {
  //     option.selected = [];
  //   }
  //   const child = {
  //     type: 'child',
  //     name: option.name + ' - ' + option.selected.length,
  //     options: clone(option.individualOptions),
  //   };
  //   option.selected.push(child);
  //   return child;
  // }
  // else {
  //   if (option.selected === undefined) {
  //     option.selected = 0;
  //   }
    option.selected++;
  // }
}

// function getSelected(options) {
//   const selected = [];
//   for (const slug in options) {
//     console.log(slug);
    
//     const option = options[slug];
//     if (option.type !== 'group') {
//       if (option.selected !== undefined) {
//         if (typeof option.selected === 'object') {
//           for (const child of option.selected) {
//             selected.push(child);
//             selected.push(...getSelected(child.options));
//           }
//         }
//         else {
//           for (let i = 0; i < option.selected; i++) {
//             selected.push(option);
//           }
//         }
//       }
//     }
//     if (option.options !== undefined) {
//       selected.push(...getSelected(option.options));
//     }
//   }
//   return selected;
// }

// buyOption('general/immortality');
// const plane1 = buyOption('planes');
// buyOption('planes');
// buyOption('planes/1/essence');
// buyOption('planes/1/essence');
// buyOption('planes/1/scope/island');
// console.log(getSelected(options));
