import { initialState } from './initialState';
import { createReducer } from '@reduxjs/toolkit';
import { useContactStorage } from 'services/useLocalStorage';
import {
  addContactAction,
  removeContactAction,
  updateContactAction,
} from './actions';

export const contactReducer = createReducer(initialState, {
  [addContactAction]: (state, { payload }) => {
    state.contacts = useContactStorage([payload, ...state.contacts]);
  },
  [removeContactAction]: (state, { payload }) => {
    state.contacts = useContactStorage(
      state.contacts.filter(contact => contact.id !== payload)
    );
  },
  [updateContactAction]: (state, { payload }) => {
    state.contacts = useContactStorage(
      state.contacts.map(el => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      })
    );
  },
});
