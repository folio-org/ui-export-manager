import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { LIMIT_MAX } from '@folio/stripes-acq-components';

import { useConfigs } from './useConfigs';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
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
    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });
  });

  it('fetches integration configs', async () => {
    const { result, waitFor } = renderHook(() => useConfigs(), { wrapper });

    await waitFor(() => !result.current.isFetching);

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
