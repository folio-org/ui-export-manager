import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { useExportConfig } from './useExportConfig';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const mockConfig = {
  id: 'exportJobId',
};

describe('useExportConfig', () => {
  beforeEach(() => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => Promise.resolve(mockConfig),
        }),
      });
  });

  it('should return fetched fiscal years', async () => {
    const { result, waitFor } = renderHook(() => useExportConfig(mockConfig.id), { wrapper });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.config).toEqual(mockConfig);
  });
});
