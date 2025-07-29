import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { EXPORT_JOBS_DELETION_INTERVALS_API } from '../../../common/constants';
import { TRANSLATION_KEYS_DICT } from '../constants';
import { useJobDeletionIntervals } from './useJobDeletionIntervals';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
const jobDeletionIntervals = Object.keys(TRANSLATION_KEYS_DICT).map((key) => ({
  exportType: key,
  retentionDays: 7,
}));

describe('useJobDeletionIntervals', () => {
  const getMock = jest.fn(() => ({
    json: () => ({
      jobDeletionIntervals,
      totalRecords: jobDeletionIntervals.length,
    }),
  }));

  beforeEach(() => {
    useOkapiKy.mockReturnValue({ get: getMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch job deletion intervals', async () => {
    const { result } = renderHook(() => useJobDeletionIntervals(), { wrapper });

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    expect(result.current.jobDeletionIntervals).toEqual(jobDeletionIntervals);
    expect(getMock).toHaveBeenCalledWith(EXPORT_JOBS_DELETION_INTERVALS_API, expect.any(Object));
  });
});
