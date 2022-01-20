import { QueryClient, QueryClientProvider } from 'react-query';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { useExportJobScheduler } from '../../common/hooks';
import { ExportEdiJobDetailsActionMenu } from './ExportEdiJobDetailsActionMenu';

jest.mock('@folio/stripes-acq-components', () => {
  return {
    ...jest.requireActual('@folio/stripes-acq-components'),
    useShowCallout: () => jest.fn(),
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

const defaultProps = {
  exportJob: { id: 'jobId' },
  onToggle: jest.fn(),
  refetchJobs: jest.fn(),
};

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
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

  beforeEach(() => {
    scheduleExportJob.mockClear();
    useExportJobScheduler.mockClear().mockReturnValue({ scheduleExportJob });
  });

  it('should display action menu items', () => {
    renderExportEdiJobDetailsActionMenu();

    expect(screen.getByTestId('job-action-rerun')).toBeInTheDocument();
  });

  it('should send POST request when Rerun button was clicked', () => {
    renderExportEdiJobDetailsActionMenu();

    user.click(screen.getByTestId('job-action-rerun'));

    expect(scheduleExportJob).toHaveBeenCalled();
  });
});
