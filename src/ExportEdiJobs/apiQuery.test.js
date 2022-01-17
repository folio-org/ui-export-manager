import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import '@folio/stripes-acq-components/test/jest/__mock__';
import { useOkapiKy } from '@folio/stripes/core';

import {
  useExportEdiJobsQuery,
} from './apiQuery';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Export EDI jobs api queries', () => {
  describe('useExportEdiJobsQuery', () => {
    it('should fetch export EDI jobs', async () => {
      const exportEdiJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];

      useOkapiKy.mockClear().mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportEdiJobs,
            totalRecords: 1,
          }),
        }),
      });

      const { result, waitFor } = renderHook(() => useExportEdiJobsQuery(), { wrapper });

      await waitFor(() => {
        return !result.current.isLoading;
      });

      expect(result.current.exportEdiJobs).toEqual(exportEdiJobs);
    });

    it('should return total records count', async () => {
      const exportEdiJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];
      const totalRecords = 1;

      useOkapiKy.mockClear().mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportEdiJobs,
            totalRecords,
          }),
        }),
      });

      const { result, waitFor } = renderHook(() => useExportEdiJobsQuery(), { wrapper });

      await waitFor(() => {
        return !result.current.isLoading;
      });

      expect(result.current.totalCount).toEqual(totalRecords);
    });
  });
});
