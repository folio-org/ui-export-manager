import React from 'react';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { LIMIT_MAX } from '@folio/stripes-acq-components';

export const useConfigs = (organizationId) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'edi-job-configs' });

  const searchParams = {
    query: organizationId
      ? `configName==EDIFACT_ORDERS_EXPORT_${organizationId}*`
      : 'type==EDIFACT_ORDERS_EXPORT',
    limit: LIMIT_MAX,
  };

  const { isFetching, data = {} } = useQuery(
    [namespace, organizationId],
    () => ky.get('data-export-spring/configs', { searchParams }).json(),
  );

  return ({
    configs: data.configs || [],
    isFetching,
  });
};
