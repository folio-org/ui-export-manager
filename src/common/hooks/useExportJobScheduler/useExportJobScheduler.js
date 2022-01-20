import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useExportJobScheduler = (options = {}) => {
  const ky = useOkapiKy();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (json) => ky.post('data-export-spring/jobs', { json }).json(),
    ...options,
  });

  return {
    isLoading,
    scheduleExportJob: mutateAsync,
  };
};
