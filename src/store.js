import { createStore } from 'redux';
import produce from 'immer';
import options from './options';
import settings from './settings';
import prepareOptions from './reducer/prepareOptions';
import sellOption from "./reducer/sellOption";
import buyOption from "./reducer/buyOption";
import findErrors from './reducer/findErrors';
import getOption from './functions/getOption';
import recalculateState from './reducer/recalculateState';
import tradeOption from './functions/tradeOption';
import pipe from './pipe';

const initialState = {
  path: [],
  settings,
  options: prepareOptions(options, undefined),
  errors: [],
};

function rootReducer(state, action) {
  if (state === undefined) state = initialState;
  const currentState = produce(state, newState => {
    pipe.state = newState;
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

  return currentState;
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;