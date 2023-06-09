import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { changeFilterAction } from './actions';

export const filterReducer = createReducer(initialState, {
  [changeFilterAction]: (state, { payload }) => {
    state.filter = payload;
  },
});
