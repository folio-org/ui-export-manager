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
  NoResultsMessage, PrevNextPagination,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { ExportJobId } from '../../common/components';
import { useNavigation } from '../../hooks';

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
    <ExportJobId job={exportJob} />
  ),
  source: exportJob => (
    exportJob.isSystemSource
      ? <FormattedMessage id="ui-export-manager.exportJob.system" />
      : exportJob.source
  ),
  status: exportJob => <FormattedMessage id={`ui-export-manager.exportJob.status.${exportJob.status}`} />,
  type: exportJob => <FormattedMessage id={`ui-export-manager.exportJob.details.type.${exportJob.type}`} defaultMessage={exportJob.type} />,
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
  pagination,
  height,
  width,
}) => {
  const history = useHistory();
  const location = useLocation();

  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, visibleColumns);

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
    <>
      <MultiColumnList
        id="export-jobs-list"
        totalCount={totalCount}
        contentData={exportJobs}
        loading={isLoading}
        onNeedMoreData={onNeedMoreData}
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        formatter={resultsFormatter}
        height={height - PrevNextPagination.HEIGHT}
        width={width}
        sortOrder={sortingField}
        sortDirection={sortingDirection}
        onHeaderClick={changeSorting}
        isEmptyMessage={resultsStatusMessage}
        hasMargin
        pagingType="none"
        onRowClick={openJobDetails}
        interactive
        showSortIndicator
      />
      {exportJobs.length > 0 && (
        <PrevNextPagination
          {...pagination}
          totalCount={totalCount}
          disabled={isLoading}
          onChange={onNeedMoreData}
        />
      )}
    </>
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
  pagination: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
};
