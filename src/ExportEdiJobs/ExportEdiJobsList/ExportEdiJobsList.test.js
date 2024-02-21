import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { runAxeTest } from '@folio/stripes-testing';
import { ExportEdiJobsList } from './ExportEdiJobsList';

jest.mock('react-virtualized-auto-sizer', () => {
  return jest.fn(({ children }) => <div>{children({})}</div>);
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({}),
  useHistory: () => ({}),
}));

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    NoResultsMessage: () => 'NoResultsMessage',
  };
});

jest.mock('../../common/components', () => ({
  ExportJobId: () => <span>ExportEdiJobId</span>,
}));

const getExportJob = () => ({
  id: Math.random(),
  jobId: '102',
  status: 'Successful',
  type: 'bursar',
  description: '# of charges: 20',
  source: 'System',
  startTime: '2020-08-12T12:21:21.123+00:00',
  endTime: '2020-08-12T12:25:21.123+00:00',
  files: [
    '/img/tenant-assets/opentown-libraries-logo.c96ff678691e1a345321b50941335d81.png',
    '/img/tenant-assets/opentown-libraries-logo.c96ff678691e1a345321b50941335d81.png',
  ],
});

const renderExportEdiJobsList = ({ exportJobs = [] }) => (render(
  <ExportEdiJobsList
    exportJobs={exportJobs}
    isLoading={false}
    isFiltersOpened={false}
    filters={{}}
    toggleFilters={() => {}}
  />,
));

describe('ExportEdiJobsList', () => {
  it('should display export EDI jobs table header', () => {
    const exportJob = getExportJob();
    const { getByText } = renderExportEdiJobsList({ exportJobs: [exportJob] });

    expect(getByText('ui-export-manager.exportJob.jobId')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.status')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.description')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.source')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.startTime')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.endTime')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.exportMethod')).toBeDefined();
  });

  it('should render with no axe errors', async () => {
    getExportJob();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
