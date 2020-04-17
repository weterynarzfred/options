import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from 'redux';
import produce from 'immer';
import options from './options';
import sellOption from "./functions/sellOption";
import buyOption from "./functions/buyOption";
import prepareOptions from './functions/prepareOptions';
import settings from './settings';
import prepareSettings from './functions/prepareSettings';
import findErrors from './functions/findErrors';
import getOption from './functions/getOption';
import recalculateState from './functions/recalculateState';

const initialState = {
  path: [],
  options: prepareOptions(options),
  settings: prepareSettings(settings),
  errors: [],
};

function rootReducer(state = initialState, action) {
  return produce(state, state => {
    if (action.type === 'BUY_OPTION') {
      buyOption(action.option, state.options);
      findErrors(state);
    }
    else if (action.type === 'SELL_OPTION') {
      sellOption(action.option, state.options, state.path);
      findErrors(state);
    }
    else if (action.type === 'CHANGE_PATH') {
      state.path = action.path;
    }
    else if (action.type === 'CHANGE_TEXT') {
      getOption(action.option, state.options)[action.textProp] = action.text;
    }
    else {
      findErrors(state);
    }
    
    recalculateState(state);
    return state;
  });
}

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);