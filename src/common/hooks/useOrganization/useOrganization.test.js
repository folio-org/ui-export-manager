import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';
import { VENDORS_API } from '@folio/stripes-acq-components';

import { useOrganization } from './useOrganization';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const organization = {
  id: 'orgId',
  code: 'AMAZ',
  name: 'Azmazon',
};

describe('useOrganization', () => {
  const mockGet = jest.fn(() => ({
    json: () => organization,
  }));

  beforeEach(() => {
    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });
  });

  it('fetches organization', async () => {
    const { result, waitFor } = renderHook(() => useOrganization(organization.id), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.organization).toEqual(organization);
    expect(mockGet).toHaveBeenCalledWith(`${VENDORS_API}/${organization.id}`);
  });
});
