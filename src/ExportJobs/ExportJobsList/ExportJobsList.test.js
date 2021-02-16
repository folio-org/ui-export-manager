import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { ExportJobsList } from './ExportJobsList';

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
  ExportJobId: () => <span>ExportJobId</span>,
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

const renderExportJobsList = ({ exportJobs = [] }) => (render(
  <ExportJobsList
    exportJobs={exportJobs}
    isLoading={false}
    isFiltersOpened={false}
    filters={{}}
    toggleFilters={() => {}}
  />,
));

describe('ExportJobsList', () => {
  it('should display export jobs table header', async () => {
    const exportJob = getExportJob();
    const { getByText } = renderExportJobsList({ exportJobs: [exportJob] });

    expect(getByText('ui-export-manager.exportJob.jobId')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.status')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.type')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.description')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.source')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.startTime')).toBeDefined();
    expect(getByText('ui-export-manager.exportJob.endTime')).toBeDefined();
  });

  // it('Than it should display log events table row', async () => {
  //   const logEvent = getLogEvent();
  //   const { getByText } = renderCirculationLogList({ logEvents: [logEvent] });
  //
  //   expect(getByText(`${logEvent.userBarcode}`)).toBeDefined();
  //   expect(getByText(`${logEvent.items[0].itemBarcode}`)).toBeDefined();
  //   expect(getByText(`ui-circulation-log.logEvent.object.${logEvent.object}`)).toBeDefined();
  //   expect(getByText(`ui-circulation-log.logEvent.action.${logEvent.action}`)).toBeDefined();
  //   expect(getByText(logEvent.date)).toBeDefined();
  //   expect(getByText(logEvent.source)).toBeDefined();
  //   expect(getByText(logEvent.description)).toBeDefined();
  //   expect(getByText(servicePoint.name)).toBeDefined();
  //   expect(getByText('CirculationLogEventActions')).toBeDefined();
  // });
});
