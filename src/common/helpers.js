export const getDataByFiltersState = (data, filters) => {
  const hasAppliedFilters = Object.values(filters).filter(Boolean).length > 0;

  if (!hasAppliedFilters) {
    return undefined;
  }

  return data;
};
