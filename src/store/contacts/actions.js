import { createAction } from '@reduxjs/toolkit';

export const addContactAction = createAction('contact/add');
export const removeContactAction = createAction('contact/delete');
export const updateContactAction = createAction('contact/edit');
