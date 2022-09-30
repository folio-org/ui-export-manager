import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import '@folio/stripes-acq-components/test/jest/__mock__';
import { useOkapiKy } from '@folio/stripes/core';

import {
  useExportJobsQuery,
} from './apiQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Export jobs api queries', () => {
  describe('useExportJobsQuery', () => {
    it('should fetch export jobs', async () => {
      const exportJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];

      useOkapiKy.mockClear().mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportJobs,
            totalRecords: 1,
          }),
        }),
      });

      const { result, waitFor } = renderHook(() => useExportJobsQuery(
        {}, {
          offset: 30,
          limit: 30,
        },
      ), { wrapper });

      await waitFor(() => {
        return !result.current.isLoading;
      });

      expect(result.current.exportJobs).toEqual(exportJobs);
    });

    it('should return total records count', async () => {
      const exportJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];
      const totalRecords = 1;

      useOkapiKy.mockClear().mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportJobs,
            totalRecords,
          }),
        }),
      });

      const { result, waitFor } = renderHook(() => useExportJobsQuery(
        {}, {
          offset: 30,
          limit: 30,
        },
      ), { wrapper });

      await waitFor(() => {
        return !result.current.isLoading;
      });

      expect(result.current.totalCount).toEqual(totalRecords);
    });
  });
});
