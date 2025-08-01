import { MemoryRouter } from 'react-router-dom';

import {
  act,
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { JobsSettingsForm } from './components';
import {
  DELETION_INTERVALS_FIELD_ARRAY_NAME,
  TRANSLATION_KEYS_DICT,
} from './constants';
import {
  useJobDeletionIntervals,
  useJobDeletionIntervalsMutation,
} from './hooks';
import { JobsSettings } from './JobsSettings';

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  JobsSettingsForm: jest.fn(() => <div>JobsSettingsForm</div>),
}));

jest.mock('./hooks', () => ({
  useJobDeletionIntervals: jest.fn(),
  useJobDeletionIntervalsMutation: jest.fn(),
}));

const jobDeletionIntervals = Object.keys(TRANSLATION_KEYS_DICT).map((key) => ({
  exportType: key,
  retentionDays: 7,
}));

const updateJobDeletionIntervalsMock = jest.fn(() => Promise.resolve([
  {
    status: 'fulfilled',
    exportType: jobDeletionIntervals[0].exportType,
  },
  {
    status: 'rejected',
    exportType: jobDeletionIntervals[1].exportType,
  },
]));

const renderJobsSettings = () => render(
  <JobsSettings />,
  { wrapper: MemoryRouter }
);

describe('JobsSettings', () => {
  beforeEach(() => {
    jest.mocked(useJobDeletionIntervals).mockReturnValue({
      jobDeletionIntervals,
      refetch: jest.fn(),
    });

    jest.mocked(useJobDeletionIntervalsMutation).mockReturnValue({
      isLoading: false,
      updateJobDeletionIntervals: updateJobDeletionIntervalsMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render jobs settings form', () => {
    renderJobsSettings();

    expect(screen.getByText('JobsSettingsForm')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    renderJobsSettings();

    await act(async () => JobsSettingsForm.mock.calls[0][0].onSubmit(
      { jobDeletionIntervals },
      {
        getState: () => ({ dirtyFields: {
          [`${DELETION_INTERVALS_FIELD_ARRAY_NAME}[0].retentionDays`]: true,
          [`${DELETION_INTERVALS_FIELD_ARRAY_NAME}[1].retentionDays`]: true,
        } }),
      }
    ));

    expect(updateJobDeletionIntervalsMock).toHaveBeenCalledWith({
      data: jobDeletionIntervals.slice(0, 2),
    });
  });
});
