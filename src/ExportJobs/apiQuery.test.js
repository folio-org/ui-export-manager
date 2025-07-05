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
  buildJobsQuery,
  useExportJobsQuery,
} from './apiQuery';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useExportJobsQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch export jobs and map them correctly', async () => {
    const exportJobs = [{
      id: 'uuias43',
      name: '123',
      description: '# of Charges: 5',
    }];
    const totalRecords = 1;

    useOkapiKy.mockReturnValue({
      get: jest.fn().mockReturnValue({
        json: () => ({
          jobRecords: exportJobs,
          totalRecords,
        }),
      }),
    });

    const { result } = renderHook(() => useExportJobsQuery(
      '?limit=100&offset=0&status=SCHEDULED&type=CLAIMS', {
        offset: 30,
        limit: 30,
      },
      {
        status: 'SCHEDULED',
        type: 'CLAIMS',
      },
    ), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.exportJobs).toEqual(exportJobs);
    expect(result.current.totalCount).toEqual(totalRecords);
  });

  it('should handle empty result gracefully', async () => {
    useOkapiKy.mockReturnValue({
      get: jest.fn().mockReturnValue({
        json: () => ({
          jobRecords: [],
          totalRecords: 0,
        }),
      }),
    });

    const { result } = renderHook(() => useExportJobsQuery(
      '?limit=100&offset=0', {
        offset: 0,
        limit: 10,
      },
      {},
    ), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.exportJobs).toEqual([]);
  });

  it('should correctly call the API with generated CQL query', async () => {
    const getMock = jest.fn().mockReturnValue({
      json: () => ({
        jobRecords: [],
        totalRecords: 0,
      }),
    });

    useOkapiKy.mockReturnValue({ get: getMock });

    const { result } = renderHook(() => useExportJobsQuery(
      '?limit=100&offset=0&status=SCHEDULED', {
        offset: 30,
        limit: 30,
      },
      {
        status: 'SCHEDULED',
      },
    ), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(getMock).toHaveBeenCalledWith(
      'data-export-spring/jobs',
      expect.objectContaining({
        searchParams: expect.objectContaining({
          query: expect.stringContaining('status=="SCHEDULED"'),
        }),
      }),
    );
  });
});

describe('buildJobsQuery', () => {
  it('should generate correct query', () => {
    const parsedQuery = {
      status: 'SUCCESSFUL',
      type: ['ORDERS_CSV', 'ORDERS_EDI', 'BURSAR_FEES_FINES'],
    };

    expect(buildJobsQuery(parsedQuery)).toEqual('(status=="SUCCESSFUL" and ((type==("CLAIMS" or "EDIFACT_ORDERS_EXPORT") and jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.fileFormat==("CSV" or "EDI")) or (type==(BURSAR_FEES_FINES)))) sortby name/sort.descending');
  });
});
