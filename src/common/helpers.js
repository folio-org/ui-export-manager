export const areFilersEmpty = (filters) => {
  return Object.values(filters).every((value) => !value);
};
