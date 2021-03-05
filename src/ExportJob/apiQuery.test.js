import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import '@folio/stripes-acq-components/test/jest/__mock__';
import { useOkapiKy } from '@folio/stripes/core';

import {
  useExportJobQuery,
} from './apiQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Export job api queries', () => {
  describe('useExportJobQuery', () => {
    it('should fetch export job', async () => {
      const exportJob = {
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      };

      useOkapiKy.mockClear().mockReturnValue({
        get: () => ({
          json: () => exportJob,
        }),
      });

      const { result, waitFor } = renderHook(() => useExportJobQuery(), { wrapper });

      await waitFor(() => {
        return !result.current.isLoading;
      });

      expect(result.current.exportJob).toEqual(exportJob);
    });
  });
});
