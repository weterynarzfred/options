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

const initialState = {
  options: prepareOptions(options),
  settings: prepareSettings(settings),
};

function rootReducer(state = initialState, action) {
  return produce(state, state => {
    if (action.type === 'BUY_OPTION') {
      buyOption(action.option, state.options);
    }
    else if (action.type === 'SELL_OPTION') {
      sellOption(action.option, state.options);
    }
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