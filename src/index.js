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
      sellOption(action.option, state.options);
      findErrors(state);
    }
    else if (action.type === 'CHANGE_PATH') {
      state.path = action.path;
    }
    
    findErrors(state);
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