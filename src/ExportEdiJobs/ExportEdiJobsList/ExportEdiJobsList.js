import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  MultiColumnList, NoValue,
} from '@folio/stripes/components';
import {
  FolioFormattedTime,
  NoResultsMessage,
  useLocationSorting,
} from '@folio/stripes-acq-components';

import { ExportJobId } from '../../common/components';
import { useNavigation } from '../../hooks';

const sortableFields = ['jobId', 'status', 'startTime', 'endTime', 'exportMethod'];
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
    <ExportJobId
      jobId={exportJob.name}
      files={exportJob.files}
    />
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
}) => {
  const history = useHistory();
  const location = useLocation();

  const [
    sortingField,
    sortingDirection,
    changeSorting,
  ] = useLocationSorting(location, history, resetData, sortableFields);

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
    <MultiColumnList
      id="export-edi-jobs-list"
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
      onRowClick={openEdiJobDetails}
      interactive
    />
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
};
