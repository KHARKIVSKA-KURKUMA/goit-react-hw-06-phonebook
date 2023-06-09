export const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
};
