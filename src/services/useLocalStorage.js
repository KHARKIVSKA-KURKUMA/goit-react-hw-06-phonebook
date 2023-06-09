export const useContactStorage = value => {
  localStorage.setItem('contacts', JSON.stringify(value));
  return value;
};
