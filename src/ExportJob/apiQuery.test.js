import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import {
  useExportJobQuery,
} from './apiQuery';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Export job api queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useExportJobQuery', () => {
    it('should fetch export job', async () => {
      const exportJob = {
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      };

      useOkapiKy.mockReturnValue({
        get: () => ({
          json: () => exportJob,
        }),
      });

      const { result } = renderHook(() => useExportJobQuery(), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.exportJob).toEqual(exportJob);
    });
  });
});
