import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useExportEdiJobsQuery } from './apiQuery';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Export EDI jobs api queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useExportEdiJobsQuery', () => {
    it('should fetch export EDI jobs', async () => {
      const exportEdiJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];

      useOkapiKy.mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportEdiJobs,
            totalRecords: 1,
          }),
        }),
      });

      const { result } = renderHook(() => useExportEdiJobsQuery(
        '?limit=100&offset=0&status=SCHEDULED', {
          offset: 30,
          limit: 30,
        },
        {
          status: 'SCHEDULED',
        },
      ), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.exportEdiJobs).toEqual(exportEdiJobs);
    });

    it('should return total records count', async () => {
      const exportEdiJobs = [{
        id: 'uuias43',
        name: '123',
        description: '# of Charges: 5',
      }];
      const totalRecords = 1;

      useOkapiKy.mockReturnValue({
        get: () => ({
          json: () => ({
            jobRecords: exportEdiJobs,
            totalRecords,
          }),
        }),
      });

      const { result } = renderHook(() => useExportEdiJobsQuery(
        '?limit=100&offset=0&status=SCHEDULED', {
          offset: 30,
          limit: 30,
        },
        {
          status: 'SCHEDULED',
        },
      ), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.totalCount).toEqual(totalRecords);
    });
  });
});
