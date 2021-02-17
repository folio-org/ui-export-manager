import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { useExportJobQuery } from './apiQuery';
import { ExportJob } from './ExportJob';

jest.mock('../common/components', () => ({
  ExportJobId: () => <span>ExportJobId</span>,
}));
jest.mock('../hooks', () => ({
  useNavigation: jest.fn().mockReturnValue({}),
}));

jest.mock('./apiQuery', () => ({
  useExportJobQuery: jest.fn(),
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

const renderExportJobsList = () => (render(
  <ExportJob uuid="u2s3" />,
));

describe('ExportJob', () => {
  beforeEach(() => {
    useExportJobQuery.mockClear();
  });

  it('should fetch export job', () => {
    const exportJob = getExportJob();

    useExportJobQuery.mockReturnValue({ exportJob });

    renderExportJobsList();

    expect(useExportJobQuery).toHaveBeenCalled();
  });
});
