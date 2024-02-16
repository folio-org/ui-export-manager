import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { runAxeTest } from '@folio/stripes-testing';
import { useExportEdiJobsQuery } from './apiQuery';
import { ExportEdiJobs } from './ExportEdiJobs';
import { useExportJobQuery } from '../ExportJob/apiQuery';

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
    usePagination: () => ({}),
  };
});

jest.mock('../common/components', () => ({
  Navigation: () => <span>Navigation</span>,
}));
jest.mock('../hooks', () => ({
  useNavigation: jest.fn().mockReturnValue({}),
}));

jest.mock('./ExportEdiJobsList', () => ({
  ExportEdiJobsList: () => <span>ExportEdiJobsList</span>,
}));
jest.mock('./ExportEdiJobsFilters', () => ({
  ExportEdiJobsFilters: () => <span>ExportEdiJobsFilters</span>,
}));
jest.mock('./apiQuery', () => ({
  useExportEdiJobsQuery: jest.fn(),
}));

const renderExportEdiJobs = () => (render(
  <ExportEdiJobs />,
));

describe('ExportEdiJobs', () => {
  beforeEach(() => {
    useExportEdiJobsQuery.mockClear().mockReturnValue({ exportJobs: [] });
  });

  describe('Filters section', () => {
    it('should display search control', () => {
      const { getByText } = renderExportEdiJobs();

      expect(getByText('SingleSearchForm')).toBeDefined();
    });

    it('should display reset filters control', () => {
      const { getByText } = renderExportEdiJobs();

      expect(getByText('ResetButton')).toBeDefined();
    });

    it('should display export EDI jobs filters', () => {
      const { getByText } = renderExportEdiJobs();

      expect(getByText('ExportEdiJobsFilters')).toBeDefined();
    });

    it('should render with no axe errors', async () => {
      renderExportEdiJobs();

      await runAxeTest({
        rootNode: document.body,
      });
    });
  });

  describe('Results section', () => {
    it('should display export EDI jobs list', () => {
      const { getByText } = renderExportEdiJobs();

      expect(getByText('ExportEdiJobsList')).toBeDefined();
    });
    it('should render with no axe errors', async () => {
      renderExportEdiJobs();

      await runAxeTest({
        rootNode: document.body,
      });
    });
  });
});
