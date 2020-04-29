import { createStore } from 'redux';
import produce from 'immer';
import options from './options';
import settings from './settings';
import prepareOptions from './reducer/prepareOptions';
import buyOption from "./reducer/buyOption";
import sellOption from "./reducer/sellOption";
import tradeOption from './reducer/tradeOption';
import getOption from './functions/getOption';
import recalculateState from './reducer/recalculateState';
import pipe from './pipe';

const initialState = {
  path: [],
  settings,
  options: prepareOptions(options, undefined),
  errors: [],
};

function rootReducer(state = initialState, action = '') {
  return produce(state, newState => {
    pipe.state = newState;
    let skipRecalculate = false;
    if (action.type === 'BUY_OPTION') {
      buyOption(action.option, newState.options);
    }
    else if (action.type === 'SELL_OPTION') {
      sellOption(action.option, newState.options, newState.path);
    }
    else if (action.type === 'TRADE_OPTION') {
      tradeOption(action.option, newState.options, action.value);
    }
    else if (action.type === 'CHANGE_PATH') {
      const newPath = action.path.filter(e => e !== '');
      if (newPath.length > newState.path.length) {
        for (let i = 0; i < newPath.length; i++) {
          if (i < newState.path.length) {
            newPath[i] = newState.path[i];
          }
          else {
            newPath[i] = {
              slug: newPath[i],
              scroll: 0,
            };
            if (i === newState.path.length) {
              newPath[i].scroll = action.scroll;
            }
          }
        }
        pipe.scroll = 0;
        newState.path = newPath;
      }
      else {
        pipe.scroll = newState.path[newPath.length].scroll;
        newState.path.splice(newPath.length);
      }

      skipRecalculate = true;
    }
    else if (action.type === 'CHANGE_TEXT') {
      getOption(action.option, newState.options)[action.textProp] = action.text;
      skipRecalculate = true;
    }

    if (!skipRecalculate) {
      recalculateState(newState);
    }

    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;