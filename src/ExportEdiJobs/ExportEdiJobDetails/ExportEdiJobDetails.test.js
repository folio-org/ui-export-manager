import React from 'react';
import { screen, render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import { useExportJobQuery } from '../../ExportJob/apiQuery';
import { ExportEdiJobDetails } from './ExportEdiJobDetails';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useOrganization: () => jest.fn().mockReturnValue({}),
}));
jest.mock('../../common/components', () => ({
  ...jest.requireActual('../../common/components'),
  ExportJobId: () => <span>ExportJobId</span>,
}));
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useNavigation: jest.fn().mockReturnValue({}),
}));

jest.mock('../../ExportJob/apiQuery', () => ({
  ...jest.requireActual('../../ExportJob/apiQuery'),
  useExportJobQuery: jest.fn(),
}));

const exportJob = {
  id: 'id',
  name: '123',
  status: 'SCHEDULED',
  type: 'EDIFACT_ORDERS',
  description: 'Test job',
  source: 'System',
  startTime: '2020-08-12T12:21:21.123+00:00',
  endTime: '2020-08-12T12:25:21.123+00:00',
  files: [
    '/file1.edi',
    '/file2.edi',
  ],
  exportTypeSpecificParameters: {
    vendorEdiOrdersExportConfig: {
      vendorId: 'vendorId',
      name: 'vendorName',
    },
  },
};

const renderExportEdiJobDetails = () => render(
  <ExportEdiJobDetails uuid="id" />,
);

describe('ExportEdiJobDetails', () => {
  beforeEach(() => {
    useExportJobQuery.mockClear();
  });

  it('should fetch export job', () => {
    useExportJobQuery.mockReturnValue({ exportJob });

    renderExportEdiJobDetails();

    expect(useExportJobQuery).toHaveBeenCalled();
  });

  it('should display loading pane when fetch is in progress', () => {
    useExportJobQuery.mockReturnValue({ isLoading: true, exportJob });

    renderExportEdiJobDetails();

    expect(screen.getByTestId('export-edi-job-loading')).toBeDefined();
  });

  it('should display job details fields', () => {
    useExportJobQuery.mockReturnValue({ isLoading: false, exportJob });

    renderExportEdiJobDetails();

    [
      'ui-export-manager.exportJob.jobId',
      'ui-export-manager.exportJob.status',
      'ui-export-manager.exportJob.startTime',
      'ui-export-manager.exportJob.endTime',
      'ui-export-manager.exportJob.source',
      'ui-export-manager.exportJob.organization',
      'ui-export-manager.exportJob.exportMethod',
      'ui-export-manager.exportJob.description',
      'ui-export-manager.exportJob.errorDetails',
    ].forEach(label => (
      expect(screen.getByText(label)).toBeInTheDocument()
    ));
  });
});
