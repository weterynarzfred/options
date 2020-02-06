export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function getOption(path, options) {
  if (typeof path === 'object') {
    if (!Array.isArray(path)) {
      path = path.path.split('/').reverse();
    }
    else {
      path.reverse();
    }
  }
  else {
    path = path.split('/').reverse();
  }
  let option = {options};
  
  while (path.length) {
    if (option.options !== undefined) {
      option = option.options[path.pop()];
    }
    else if (typeof option.selected === 'object' && option.selected[path[path.length - 1]] !== undefined) {
      option = option.selected[path.pop()];
    }
    
  }
  return option;
}

export function getParent(option, options) {
  let pathArray = option.path.split('/');
  if (pathArray.length <= 1) return false;
  pathArray.pop();
  return getOption(pathArray, options);
}

// function getCount(option) {
//   option = getOption(option);
//   if (option.selected === undefined) return 0;
//   if (option.selected.length === undefined) return option.selected;
//   return option.selected.length;
// }

export function getSelected(option, options) {
  option = getOption(option, options);
  if (option.type === 'option') return option.selected;
  const selected = [];
//   for (const slug in option.options) {
//     const option = options[slug];
//     if (option.type === 'option') {
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
    //   }
    // }
//     if (option.options !== undefined) {
//       selected.push(...getSelected(option.options));
//     }
//   }
  return selected;
}

// buyOption('general/immortality');
// const plane1 = buyOption('planes');
// buyOption('planes');
// buyOption('planes/1/essence');
// buyOption('planes/1/essence');
// buyOption('planes/1/scope/island');
// console.log(getSelected(options));
