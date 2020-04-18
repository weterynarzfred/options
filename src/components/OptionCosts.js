// import React from 'react';
// import { connect } from 'react-redux';
// import classNames from 'classnames';
// import getOption from '../functions/getOption';
// import { clone } from '../functions/helpers';
// import getSelectedCount from '../functions/getSelectedCount';

/**
 * Get all currencies current option can have.
 * @param {object} props Global props.
 * @param {string} path Path of the option being checked.
 */
// function getCurrencies(props, path) {
//   const currencies = clone(props.settings.currency);
//   path = path.split('/').reverse();
//   let currentPath = '';
//   while (path.length > 0) {
//     currentPath += '/' + path.pop();
//     const option = getOption(currentPath, props.options);
//     if (option.optionCurrency !== undefined) {
//       Object.assign(currencies, option.optionCurrency);
//     }
//   }
//   return currencies;
// }

/**
 * Calculates and displays cost of an option
 * @param {object} props Global props.
 */
// function OptionCosts(props) {
//   const option = props.option;
//   if (option.type !== 'option') return false;
//   if (option.cost === undefined) return false;
//   const costs = [];
//   const currencies = getCurrencies(props, option.path);

//   for (const currencySlug in option.cost) {
//     if (currencies[currencySlug] === undefined) continue;
//     const currencyName = currencies[currencySlug].name;
//     let cost = 0;
//     if (typeof option.cost[currencySlug] === 'number') {
//       cost = option.cost[currencySlug];
//     }
//     else if (typeof option.cost[currencySlug] === 'function') {
//       cost += option.cost[currencySlug]({
//         option,
//         options: props.options,
//         index: getSelectedCount(option, props.options),
//       });
//     }
//     costs.push(
//       <div
//         className={classNames(
//           'Option-cost',
//           'currency',
//           {positive: cost < 0}
//         )}
//         key={`option-${option.path}-cost-${currencySlug}`}
//       >
//         <div className="currency-name">{currencyName}</div>
//         <div className="currency-value">{(cost > 0 ? '' : '+') + (-cost)}</div>
//       </div>
//     );
//   }

//   return <div className="OptionCosts">{costs}</div>;
// }

// function mapStateToProps(state) {
//   return {
//     options: state.options,
//     settings: state.settings,
//   };
// }

// export default connect(mapStateToProps)(OptionCosts);
