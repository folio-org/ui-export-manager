import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useJobDeletionIntervalsMutation } from './useJobDeletionIntervalsMutation';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const putMock = jest.fn(() => ({
  json: () => Promise.resolve({ id: 'jobId' }),
}));

describe('useJobDeletionIntervalsMutation', () => {
  beforeEach(() => {
    useOkapiKy.mockReturnValue({
      put: putMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make PUT requests to update deletion intervals of export types', async () => {
    const { result } = renderHook(() => useJobDeletionIntervalsMutation(), { wrapper });

    const data = [
      { exportType: 'exportType1', retentionDays: 7 },
      { exportType: 'exportType2', retentionDays: 14 },
    ];

    await result.current.updateJobDeletionIntervals({ data });

    expect(putMock).toHaveBeenCalledTimes(2);
  });
});
