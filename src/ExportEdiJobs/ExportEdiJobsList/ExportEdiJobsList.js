import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';
import {
  DESC_DIRECTION,
  FolioFormattedTime,
  NoResultsMessage,
  PrevNextPagination,
  SORTING_DIRECTION_PARAMETER,
  SORTING_PARAMETER,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { ExportJobId } from '../../common/components';
import { useNavigation } from '../../hooks';

const visibleColumns = ['jobId', 'status', 'description', 'source', 'startTime', 'endTime', 'exportMethod'];
const columnMapping = {
  jobId: <FormattedMessage id="ui-export-manager.exportJob.jobId" />,
  status: <FormattedMessage id="ui-export-manager.exportJob.status" />,
  description: <FormattedMessage id="ui-export-manager.exportJob.description" />,
  source: <FormattedMessage id="ui-export-manager.exportJob.source" />,
  startTime: <FormattedMessage id="ui-export-manager.exportJob.startTime" />,
  endTime: <FormattedMessage id="ui-export-manager.exportJob.endTime" />,
  exportMethod: <FormattedMessage id="ui-export-manager.exportJob.exportMethod" />,
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
  startTime: exportJob => Boolean(exportJob.startTime) && <FolioFormattedTime dateString={exportJob.startTime} />,
  endTime: exportJob => Boolean(exportJob.endTime) && <FolioFormattedTime dateString={exportJob.endTime} />,
  exportMethod: exportJob => (
    exportJob.exportTypeSpecificParameters?.vendorEdiOrdersExportConfig?.configName || <NoValue />
  ),
};
const resetData = () => {};

export const ExportEdiJobsList = ({
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
  const DEFAULT_SORTING = { [SORTING_PARAMETER]: 'jobId', [SORTING_DIRECTION_PARAMETER]: DESC_DIRECTION };

  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, visibleColumns, DEFAULT_SORTING);

  const { navigateToEdiJobDetails } = useNavigation();

  const openEdiJobDetails = useCallback(
    (e, { id }) => navigateToEdiJobDetails(id),
    [navigateToEdiJobDetails],
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
        id="export-edi-jobs-list"
        totalCount={totalCount}
        contentData={exportJobs}
        loading={isLoading}
        onNeedMoreData={onNeedMoreData}
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        formatter={resultsFormatter}
        sortOrder={sortingField}
        sortDirection={sortingDirection}
        onHeaderClick={changeSorting}
        isEmptyMessage={resultsStatusMessage}
        height={height - PrevNextPagination.HEIGHT}
        width={width}
        hasMargin
        pagingType="none"
        onRowClick={openEdiJobDetails}
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

ExportEdiJobsList.propTypes = {
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
