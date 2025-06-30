import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { render } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { runAxeTest } from '@folio/stripes-testing';

import { EXPORT_JOB_STATUS_OPTIONS } from '../../common/constants';
import {
  EXPORT_JOB_TYPES,
  EXPORT_JOB_TYPES_REQUEST_MAP,
} from '../constants';
import { ExportJobsFilters } from './ExportJobsFilters';

const defaultProps = {
  activeFilters: {},
  applyFilters: jest.fn(),
  disabled: false,
};

const queryClient = new QueryClient();

const renderExportJobsFilters = ({
  activeFilters,
  applyFilters,
  disabled,
} = defaultProps) => (render(
  <QueryClientProvider client={queryClient}>
    <ExportJobsFilters
      activeFilters={activeFilters}
      applyFilters={applyFilters}
      disabled={disabled}
    />
  </QueryClientProvider>
));

describe('ExportJobsFilters', () => {
  it('should display filter by status', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.status')).toBeDefined();

    Object.values(EXPORT_JOB_STATUS_OPTIONS)
      .forEach(({ value }) => expect(getByText(`ui-export-manager.exportJob.status.${value}`)).toBeDefined());
  });

  it('should display filter by type', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.type')).toBeDefined();

    Object.values(EXPORT_JOB_TYPES)
      .forEach((type) => expect(getByText(`ui-export-manager.exportJob.type.${type}`)).toBeDefined());
  });

  it('should display filter by system source', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.system')).toBeDefined();
  });

  it('should display filter by source', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.source')).toBeDefined();
  });

  it('should display filter by start time', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.startTime')).toBeDefined();
  });

  it('should display filter by end time', () => {
    const { getByText } = renderExportJobsFilters();

    expect(getByText('ui-export-manager.exportJob.endTime')).toBeDefined();
  });

  it('should render with no axe errors', async () => {
    const { container } = renderExportJobsFilters();

    await runAxeTest({
      rootNode: container,
    });
  });

  describe('when selecting a job type with multiple facet values', () => {
    it('should apply correct values', async () => {
      const { getByText } = renderExportJobsFilters();

      await userEvent.click(getByText('ui-export-manager.exportJob.type.AUTH_HEADINGS_UPDATES'));

      expect(defaultProps.applyFilters).toHaveBeenCalledWith('type', EXPORT_JOB_TYPES_REQUEST_MAP.AUTH_HEADINGS_UPDATES);
    });
  });
});
