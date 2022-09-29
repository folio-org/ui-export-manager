import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { EXPORT_CONFIGS_API } from '../../constants';

export const useExportConfig = (id) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'job-configs' });

  const {
    data = {},
    isError,
    isLoading,
  } = useQuery(
    [namespace, id],
    () => ky.get(`${EXPORT_CONFIGS_API}/${id}`).json(),
    {
      enabled: Boolean(id),
    }
  );

  return {
    config: data,
    isError,
    isLoading,
  }
};
