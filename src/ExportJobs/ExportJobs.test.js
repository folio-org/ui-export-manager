import React from 'react';
import { render } from '@testing-library/react';
import {
  useParams,
} from 'react-router-dom';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { useExportJobsQuery } from './apiQuery';
import { ExportJobs } from './ExportJobs';

jest.mock('react-virtualized-auto-sizer', () => {
  return jest.fn(({ children }) => <div>{children({})}</div>);
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({}),
  useHistory: jest.fn().mockReturnValue({}),
  useParams: jest.fn().mockReturnValue({}),
}));

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    useLocationFilters: () => [],
    useLocationSorting: () => [],
    ResetButton: () => <span>ResetButton</span>,
    SingleSearchForm: () => <span>SingleSearchForm</span>,
  };
});

jest.mock('../ExportJob', () => ({
  ExportJob: () => <span>ExportJob</span>,
}));
jest.mock('../hooks', () => ({
  useNavigation: jest.fn().mockReturnValue({}),
}));

jest.mock('./ExportJobsList', () => ({
  ExportJobsList: () => <span>ExportJobsList</span>,
}));
jest.mock('./ExportJobsFilters', () => ({
  ExportJobsFilters: () => <span>ExportJobsFilters</span>,
}));
jest.mock('./apiQuery', () => ({
  useExportJobsQuery: jest.fn(),
}));

const renderExportJobs = () => (render(
  <ExportJobs />,
));

describe('ExportJobs', () => {
  beforeEach(() => {
    useExportJobsQuery.mockClear().mockReturnValue({ exportJobs: [] });
  });

  describe('Filters section', () => {
    it('should display search control', () => {
      const { getByText } = renderExportJobs();

      expect(getByText('SingleSearchForm')).toBeDefined();
    });

    it('should display reset filters control', () => {
      const { getByText } = renderExportJobs();

      expect(getByText('ResetButton')).toBeDefined();
    });

    it('should display expost jobs filters', () => {
      const { getByText } = renderExportJobs();

      expect(getByText('ExportJobsFilters')).toBeDefined();
    });
  });

  describe('Results section', () => {
    it('should display expost jobs list', () => {
      const { getByText } = renderExportJobs();

      expect(getByText('ExportJobsList')).toBeDefined();
    });
  });

  describe('Details section', () => {
    it('should not display expost job details when id parameter is not present', () => {
      const { queryByText } = renderExportJobs();

      expect(queryByText('ExportJob')).toBeNull();
    });

    it('should display expost job details when id parameter is present', () => {
      useParams.mockClear().mockReturnValue({ id: 5 });

      const { getByText } = renderExportJobs();

      expect(getByText('ExportJob')).toBeDefined();
    });
  });
});
