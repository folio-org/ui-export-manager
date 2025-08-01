import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { EXPORT_JOBS_DELETION_INTERVALS_API } from '../../../common/constants';

const DEFAULT_DATA = [];

export const useJobDeletionIntervals = (options = {}) => {
  const { tenantId, ...queryOptions } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const { namespace } = useNamespace({ key: 'job-deletion-intervals' });

  const {
    data,
    ...queryInfo
  } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: ({ signal }) => ky.get(EXPORT_JOBS_DELETION_INTERVALS_API, { signal }).json(),
    ...queryOptions,
  });

  return {
    jobDeletionIntervals: data?.jobDeletionIntervals || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    ...queryInfo
  };
};
