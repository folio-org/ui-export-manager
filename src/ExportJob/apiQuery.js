import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

export const useExportJobQuery = (id) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery({
    queryKey: ['ui-export-manager', 'export-job', id],
    queryFn: () => ky.get(`data-export-spring/jobs/${id}`).json(),
  });

  return {
    isLoading,
    exportJob: data,
  };
};
