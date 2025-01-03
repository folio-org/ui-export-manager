import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  CQL_OR_OPERATOR,
  DATA_EXPORT_CONFIGS_API,
  LIMIT_MAX,
  ORGANIZATION_INTEGRATION_EXPORT_TYPES,
} from '@folio/stripes-acq-components';

const JOIN_STRING = ` ${CQL_OR_OPERATOR} `;

const buildConfigNameCql = (organizationId) => {
  const configName = ORGANIZATION_INTEGRATION_EXPORT_TYPES
    .map(type => `"${type}_${organizationId}*"`)
    .join(JOIN_STRING);

  return `configName==(${configName})`;
};

const buildTypeCql = () => {
  const type = ORGANIZATION_INTEGRATION_EXPORT_TYPES
    .map((t) => `"${t}"`)
    .join(JOIN_STRING);

  return `type==(${type})`;
};

export const useConfigs = (organizationId) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'edi-job-configs' });

  const searchParams = {
    query: organizationId
      ? buildConfigNameCql(organizationId)
      : buildTypeCql(),
    limit: LIMIT_MAX,
  };

  const { isFetching, data = {} } = useQuery(
    [namespace, organizationId],
    () => ky.get(DATA_EXPORT_CONFIGS_API, { searchParams }).json(),
  );

  return ({
    configs: data.configs || [],
    isFetching,
  });
};
