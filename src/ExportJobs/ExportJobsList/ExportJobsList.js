import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  MultiColumnList,
} from '@folio/stripes/components';
import {
  NoResultsMessage,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { useNavigation } from '../../hooks';

const sortableFields = [];
const visibleColumns = ['name'];

export const ExportJobsList = ({
  exportJobs,
  isLoading,
  isFiltersOpened,
  filters,
  toggleFilters,
}) => {
  const history = useHistory();
  const location = useLocation();

  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, () => {}, sortableFields);

  const { navigateToJobDetails } = useNavigation();

  const openJobDetails = useCallback(
    (e, { id }) => navigateToJobDetails(id),
    [navigateToJobDetails],
  );

  const resultsStatusMessage = (
    <NoResultsMessage
      isLoading={isLoading}
      filters={filters}
      isFiltersOpened={isFiltersOpened}
      toggleFilters={toggleFilters}
    />
  );

  return (
    <MultiColumnList
      id="export-jobs-list"
      totalCount={exportJobs.length}
      contentData={exportJobs}
      loading={isLoading}
      onNeedMoreData={() => {}}
      visibleColumns={visibleColumns}
      autosize
      sortOrder={sortingField}
      sortDirection={sortingDirection}
      onHeaderClick={changeSorting}
      isEmptyMessage={resultsStatusMessage}
      hasMargin
      pagingType="click"
      onRowClick={openJobDetails}
      interactive
    />
  );
};

ExportJobsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isFiltersOpened: PropTypes.bool,
  exportJobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFilters: PropTypes.func.isRequired,
  filters: PropTypes.object,
};
