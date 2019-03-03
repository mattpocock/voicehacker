import { combineReducers, createStore } from 'redux';
import globalReducer from './globalReducer';

const store = createStore(combineReducers({ global: globalReducer }));

export default store;
