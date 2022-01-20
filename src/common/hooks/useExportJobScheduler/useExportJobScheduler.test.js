import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import { useExportJobScheduler } from './useExportJobScheduler';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useExportJobScheduler', () => {
  it('should make post request when mutate fn was called', async () => {
    const postMock = jest.fn(() => ({
      json: () => Promise.resolve({ id: 'jobId' }),
    }));

    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
    });

    const { result } = renderHook(
      () => useExportJobScheduler(),
      { wrapper },
    );

    await result.current.scheduleExportJob({
      type: 'exportJobType',
      exportTypeSpecificParameters: {},
    });

    expect(postMock).toHaveBeenCalled();
  });
});
