import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  act,
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { useOkapiKy } from '@folio/stripes/core';
import {
  downloadBase64,
  useShowCallout,
} from '@folio/stripes-acq-components';

import { runAxeTest } from '@folio/stripes-testing';
import { EXPORT_JOB_STATUSES } from '../../common/constants';
import { useExportJobScheduler } from '../../common/hooks';
import { ExportEdiJobDetailsActionMenu } from './ExportEdiJobDetailsActionMenu';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    downloadBase64: jest.fn(),
    useShowCallout: jest.fn(() => jest.fn()),
  };
});
jest.mock('../../common/hooks', () => ({
  ...jest.requireActual('../../common/hooks'),
  useExportJobScheduler: jest.fn(),
}));
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useNavigation: jest.fn().mockReturnValue({}),
}));

global.URL.createObjectURL = jest.fn();

const defaultProps = {
  exportJob: {
    id: 'jobId',
    status: EXPORT_JOB_STATUSES.successful,
    fileNames: ['test-job.edi'],
  },
  onToggle: jest.fn(),
  refetchJobs: jest.fn(),
};

const toastMessage = type => `ui-export-manager.exportJob.details.action.${type}`;

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderExportEdiJobDetailsActionMenu = (props = {}) => render(
  <ExportEdiJobDetailsActionMenu
    {...defaultProps}
    {...props}
  />,
  { wrapper },
);

describe('ExportEdiJobDetailsActionMenu', () => {
  const scheduleExportJob = jest.fn(() => Promise.resolve({ id: 'jobId' }));
  const showCallout = jest.fn();
  const kyGetMock = jest.fn(() => ({
    blob: () => Promise.resolve(),
  }));
  const kyPostMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    useExportJobScheduler.mockReturnValue({ scheduleExportJob });
    useShowCallout.mockReturnValue(showCallout);
    useOkapiKy.mockReturnValue({
      get: kyGetMock,
      post: kyPostMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display action menu items', () => {
    renderExportEdiJobDetailsActionMenu();

    expect(screen.getByTestId('job-action-rerun')).toBeInTheDocument();
  });

  it('should send POST request when Rerun button was clicked', async () => {
    renderExportEdiJobDetailsActionMenu();

    await userEvent.click(screen.getByTestId('job-action-rerun'));

    expect(scheduleExportJob).toHaveBeenCalled();
  });

  it('should handle export job download (even if status failed, but export file exists)', async () => {
    renderExportEdiJobDetailsActionMenu({
      exportJob: {
        status: EXPORT_JOB_STATUSES.failed,
        fileNames: ['test.edi'],
      },
    });

    await act(async () => userEvent.click(screen.getByTestId('job-action-download')));

    expect(kyGetMock).toHaveBeenCalled();
    expect(downloadBase64).toHaveBeenCalled();
  });

  it('should handle export job download error', async () => {
    kyGetMock.mockReturnValue({ blob: () => Promise.reject() });

    renderExportEdiJobDetailsActionMenu();

    await act(async () => userEvent.click(screen.getByTestId('job-action-download')));

    expect(showCallout).toHaveBeenCalledWith(expect.objectContaining({
      messageId: toastMessage`download.error`,
    }));
  });

  it('should handle export job resend', async () => {
    renderExportEdiJobDetailsActionMenu();

    await act(async () => userEvent.click(screen.getByTestId('job-action-resend')));

    expect(kyPostMock).toHaveBeenCalled();
    expect(showCallout).toHaveBeenCalledWith(expect.objectContaining({
      messageId: toastMessage`resend.success`,
    }));
  });

  it('should handle export job resend error', async () => {
    kyPostMock.mockImplementation(() => Promise.reject());

    renderExportEdiJobDetailsActionMenu();

    await act(async () => userEvent.click(screen.getByTestId('job-action-resend')));

    expect(showCallout).toHaveBeenCalledWith(expect.objectContaining({
      messageId: toastMessage`resend.error`,
    }));
  });

  it('should render with no axe errors', async () => {
    renderExportEdiJobDetailsActionMenu();

    await runAxeTest({
      rootNode: document.body,
    });
  });
});
