import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';
import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { useConfigs } from './useConfigs';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
const configs = [{
  id: 'configId',
}];

describe('useConfigs', () => {
  const mockGet = jest.fn(() => ({
    json: () => ({
      configs,
      totalRecords: configs.length,
    }),
  }));

  beforeEach(() => {
    useOkapiKy.mockReturnValue({
      get: mockGet,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches integration configs', async () => {
    const { result } = renderHook(() => useConfigs(), { wrapper });

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    expect(result.current.configs).toEqual(configs);
    expect(mockGet).toHaveBeenCalledWith(
      'data-export-spring/configs',
      {
        searchParams: {
          query: 'type==("CLAIMS" or "EDIFACT_ORDERS_EXPORT")',
          limit: LIMIT_MAX,
        },
      },
    );
  });
});
