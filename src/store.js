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

function rootReducer(state = initialState, action) {
  return produce(state, state => {
    if (action.type === 'BUY_OPTION') {
      buyOption(action.option, state.options);
    }
    else if (action.type === 'SELL_OPTION') {
      sellOption(action.option, state.options, state.path);
    }
    else if (action.type === 'TRADE_OPTION') {
      tradeOption(action.option, state.options, action.value);
    }
    else if (action.type === 'CHANGE_PATH') {
      state.path = action.path.filter(e => e !== '');
    }
    else if (action.type === 'CHANGE_TEXT') {
      getOption(action.option, state.options)[action.textProp] = action.text;
    }

    recalculateState(state);
    findErrors(state);
    return state;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;