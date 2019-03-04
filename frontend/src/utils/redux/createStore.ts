import { combineReducers, createStore } from 'redux';
import globalReducer from './globalReducer';

export default () => createStore(combineReducers({ global: globalReducer }));
