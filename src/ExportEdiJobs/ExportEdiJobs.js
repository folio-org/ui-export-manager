import React from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  TitleManager,
  useStripes,
} from '@folio/stripes/core';
import {
  Paneset,
} from '@folio/stripes/components';
import {
  FiltersPane,
  ResetButton,
  ResultsPane,
  SingleSearchForm,
  useLocationFilters, usePagination,
  useToggle,
} from '@folio/stripes-acq-components';

import { Navigation } from '../common/components';

import { useExportEdiJobsQuery } from './apiQuery';
import { ExportEdiJobsFilters } from './ExportEdiJobsFilters';
import { ExportEdiJobsList } from './ExportEdiJobsList';
import { ExportEdiJobDetails } from './ExportEdiJobDetails';

const resetData = () => {};

export const ExportEdiJobs = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const stripes = useStripes();
  const location = useLocation();
  const params = useParams();

  const [
    filters,
    searchQuery,
    applyFilters,
    applySearch,
    changeSearch,
    resetFilters,
  ] = useLocationFilters(location, history, resetData);
  const [isFiltersOpened, toggleFilters] = useToggle(true);
  const RESULT_COUNT_INCREMENT = 100;

  const { pagination, changePage } = usePagination({ limit: RESULT_COUNT_INCREMENT, offset: 0 });
  const {
    isLoading,
    exportEdiJobs,
    totalCount,
    refetch,
  } = useExportEdiJobsQuery(location.search, pagination, filters);

  return (
    <TitleManager stripes={stripes} record={formatMessage({ id: 'ui-export-manager.title.organizations' })}>
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
              isLoading={isLoading}
              ariaLabelId="ui-export-manager.exportJobs.search"
            />

            <ResetButton
              id="reset-job-exports-filters"
              reset={resetFilters}
              disabled={!location.search || isLoading}
            />

            <ExportEdiJobsFilters
              activeFilters={filters}
              applyFilters={applyFilters}
              disabled={isLoading}
            />
          </FiltersPane>
        )
      }

        <ResultsPane
          title={formatMessage({ id: 'ui-export-manager.exportJobs' })}
          count={totalCount}
          filters={filters}
          toggleFiltersPane={toggleFilters}
          isFiltersOpened={isFiltersOpened}
          isLoading={isLoading}
          autosize
        >
          {(({ height, width }) => (
            <ExportEdiJobsList
              isLoading={isLoading}
              onNeedMoreData={changePage}
              exportJobs={exportEdiJobs}
              totalCount={totalCount}
              filters={filters}
              isFiltersOpened={isFiltersOpened}
              toggleFilters={toggleFilters}
              height={height}
              width={width}
              pagination={pagination}
            />
          ))}
        </ResultsPane>

        {
        Boolean(params.id) && (
          <ExportEdiJobDetails
            refetchJobs={refetch}
            uuid={params.id}
          />
        )
      }
      </Paneset>
    </TitleManager>
  );
};
