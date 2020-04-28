import { createStore } from 'redux';
import produce from 'immer';
import options from './options';
import sellOption from "./functions/sellOption";
import buyOption from "./functions/buyOption";
import prepareOptions from './functions/prepareOptions';
import settings from './settings';
import findErrors from './functions/findErrors';
import getOption from './functions/getOption';
import recalculateState from './functions/recalculateState';
import tradeOption from './functions/tradeOption';

const initialState = {
  path: [],
  settings,
  options: prepareOptions(options, undefined),
  errors: [],
};

function rootReducer(state, action) {
  if (state === undefined) state = initialState;
  return produce(state, newState => {
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
      newState.path = action.path.filter(e => e !== '');
    }
    else if (action.type === 'CHANGE_TEXT') {
      getOption(action.option, newState.options)[action.textProp] = action.text;
    }

    recalculateState(newState);
    findErrors(newState);
    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;