import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { EXPORT_JOBS_DELETION_INTERVALS_API } from '../../../common/constants';

export const useJobDeletionIntervalsMutation = () => {
  const ky = useOkapiKy();

  const {
    isLoading,
    mutateAsync: updateJobDeletionIntervals,
  } = useMutation({
    mutationFn: ({ data }) => {
      return Promise.allSettled(data.map((item) => {
        return ky.put(`${EXPORT_JOBS_DELETION_INTERVALS_API}/${item.exportType}`, { json: item }).json();
      }));
    },
  });

  return {
    isLoading,
    updateJobDeletionIntervals,
  };
};
