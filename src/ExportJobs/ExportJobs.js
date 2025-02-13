import React from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  TitleManager,
} from '@folio/stripes/core';
import {
  Paneset,
} from '@folio/stripes/components';
import {
  FiltersPane,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  useLocationFilters,
  usePagination,
  useToggle,
} from '@folio/stripes-acq-components';

import { Navigation } from '../common/components';
import { ExportJob } from '../ExportJob';

import {
  useExportJobsQuery,
} from './apiQuery';
import { ExportJobsFilters } from './ExportJobsFilters';
import { ExportJobsList } from './ExportJobsList';

const resetData = () => {};

export const ExportJobs = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const RESULT_COUNT_INCREMENT = 100;

  const [
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
  ] = useLocationFilters(location, history, resetData);
  const [isFiltersOpened, toggleFilters] = useToggle(true);

  const { pagination, changePage } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });
  const {
    isLoading,
    isFetching,
    exportJobs,
    totalCount,
  } = useExportJobsQuery(location.search, pagination, filters);

  return (
    <TitleManager record={formatMessage({ id: 'ui-export-manager.title.all' })}>
      <Paneset>
        {
        isFiltersOpened && (
          <FiltersPane
            toggleFilters={toggleFilters}
          >
            <Navigation />
            <SingleSearchForm
              applySearch={applySearch}
              changeSearch={changeSearch}
              searchQuery={searchQuery}
              ariaLabelId="ui-export-manager.exportJobs.search"
            />

            <ResetButton
              id="reset-job-exports-filters"
              reset={resetFilters}
              disabled={!location.search || isLoading}
            />
            <ExportJobsFilters
              activeFilters={filters}
              applyFilters={applyFilters}
            />
          </FiltersPane>
        )
      }
        <ResultsPane
          title={formatMessage({ id: 'ui-export-manager.exportJobs' })}
          count={totalCount}
          autosize
          filters={filters}
          toggleFiltersPane={toggleFilters}
          isFiltersOpened={isFiltersOpened}
        >
          {(({ height, width }) => (
            <ExportJobsList
              isLoading={isFetching}
              onNeedMoreData={changePage}
              exportJobs={exportJobs}
              totalCount={totalCount}
              filters={filters}
              isFiltersOpened={isFiltersOpened}
              toggleFilters={toggleFilters}
              pagination={pagination}
              height={height}
              width={width}
            />
          ))}
        </ResultsPane>

        {
        Boolean(params.id) && (
          <ExportJob uuid={params.id} />
        )
      }
      </Paneset>
    </TitleManager>
  );
};
