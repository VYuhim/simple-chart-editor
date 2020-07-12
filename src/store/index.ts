import { combineReducers, createStore } from 'redux';

import { chartReducer } from './Chart/chartReducer';

export const rootReducer = combineReducers({
  chart: chartReducer,
});

const store = createStore(rootReducer);

export default store;
