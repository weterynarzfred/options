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
import changePath from './reducer/changePath';

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
    switch (action.type) {
      case 'BUY_OPTION':
        buyOption(action.option, newState.options);
        break;
      case 'SELL_OPTION':
        sellOption(action.option, newState.options, newState.path);
        break;
      case 'TRADE_OPTION':
        tradeOption(action.option, newState.options, action.value);
        break;
      case 'CHANGE_PATH':
        skipRecalculate = changePath(action, newState);
        break;;
      case 'CHANGE_SUMMARY_MODE':
        newState.settings.isSummaryMode = action.state;
        break;
      case 'CHANGE_TEXT':
        const option = getOption(action.option, newState.options);
        option[action.textProp] = action.text;
        skipRecalculate = true;
        break
      case 'MARK_AS_SEEN':
        getOption(action.option, newState.options).info.isUnseen = false;
        skipRecalculate = true;
        break;
      default:
    }

    if (!skipRecalculate) recalculateState(newState);
    return newState;
  });
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;