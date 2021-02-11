import React from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useIntl } from 'react-intl';

import {
  Paneset,
} from '@folio/stripes/components';
import {
  FiltersPane,
  ResultsPane,
  useLocationFilters,
  useToggle,
} from '@folio/stripes-acq-components';

import { ExportJob } from '../ExportJob';

import {
  useExportJobsQuery,
} from './apiQuery';
import { ExportJobsList } from './ExportJobsList';

export const ExportJobs = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const { filters } = useLocationFilters({ history, location });
  const [isFiltersOpened, toggleFilters] = useToggle(true);

  const {
    isLoading,
    exportJobs,
  } = useExportJobsQuery();

  return (
    <Paneset>
      {
        isFiltersOpened && (
          <FiltersPane
            toggleFilters={toggleFilters}
          >
            Filters
          </FiltersPane>
        )
      }

      <ResultsPane
        title={formatMessage({ id: 'ui-export-manager.exportJobs' })}
        count={exportJobs.length}
        filters={filters}
        toggleFiltersPane={toggleFilters}
        isFiltersOpened={isFiltersOpened}
      >
        <ExportJobsList
          isLoading={isLoading}
          exportJobs={exportJobs}
          filters={filters}
          isFiltersOpened={isFiltersOpened}
          toggleFilters={toggleFilters}
        />
      </ResultsPane>

      {
        Boolean(params.id) && (
          <ExportJob uuid={params.id} />
        )
      }
    </Paneset>
  );
};
