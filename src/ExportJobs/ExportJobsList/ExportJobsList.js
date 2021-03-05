import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
} from '@folio/stripes/components';
import {
  FolioFormattedTime,
  NoResultsMessage,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { ExportJobId } from '../../common/components';
import { useNavigation } from '../../hooks';

const sortableFields = [];
const visibleColumns = ['jobId', 'status', 'type', 'description', 'source', 'startTime', 'endTime'];
const columnMapping = {
  jobId: <FormattedMessage id="ui-export-manager.exportJob.jobId" />,
  status: <FormattedMessage id="ui-export-manager.exportJob.status" />,
  type: <FormattedMessage id="ui-export-manager.exportJob.type" />,
  description: <FormattedMessage id="ui-export-manager.exportJob.description" />,
  source: <FormattedMessage id="ui-export-manager.exportJob.source" />,
  startTime: <FormattedMessage id="ui-export-manager.exportJob.startTime" />,
  endTime: <FormattedMessage id="ui-export-manager.exportJob.endTime" />,
};
const resultsFormatter = {
  jobId: exportJob => (
    <ExportJobId
      jobId={exportJob.name}
      files={exportJob.files}
    />
  ),
  status: exportJob => <FormattedMessage id={`ui-export-manager.exportJob.status.${exportJob.status}`} />,
  type: exportJob => <FormattedMessage id={`ui-export-manager.exportJob.type.${exportJob.type}`} />,
  startTime: exportJob => Boolean(exportJob.startTime) && <FolioFormattedTime dateString={exportJob.startTime} />,
  endTime: exportJob => Boolean(exportJob.endTime) && <FolioFormattedTime dateString={exportJob.endTime} />,
};
const resetData = () => {};

export const ExportJobsList = ({
  exportJobs,
  totalCount,
  onNeedMoreData,
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
  ] = useLocationSorting(location, history, resetData, sortableFields);

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
      totalCount={totalCount}
      contentData={exportJobs}
      loading={isLoading}
      onNeedMoreData={onNeedMoreData}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      formatter={resultsFormatter}
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
  onNeedMoreData: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  isFiltersOpened: PropTypes.bool,
  exportJobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCount: PropTypes.number,
  toggleFilters: PropTypes.func.isRequired,
  filters: PropTypes.object,
};
