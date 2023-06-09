// import { combineReducers } from 'redux';
import { contactReducer } from './contacts/contactReducer';
import { filterReducer } from './filter/filterReducer';

export const reducer = {
  contacts: contactReducer,
  filter: filterReducer,
};
