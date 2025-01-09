import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';
import {
  buildDateRangeQuery,
  CQL_OR_OPERATOR,
  makeQueryBuilder,
  ORGANIZATION_INTEGRATION_EXPORT_TYPES,
} from '@folio/stripes-acq-components';

const buildIntegrationTypesCqlValue = (type) => {
  if (!Array.isArray(type)) return type;

  const value = type
    .map((t) => `"${t}"`)
    .join(` ${CQL_OR_OPERATOR} `);

  return `(${value})`;
};

const buildJobsQuery = makeQueryBuilder(
  `type=${buildIntegrationTypesCqlValue(ORGANIZATION_INTEGRATION_EXPORT_TYPES)}`,
  (query) => {
    return `name="*${query}*" or description="*${query}*"`;
  },
  'sortby name/sort.descending',
  {
    endTime: buildDateRangeQuery.bind(null, ['endTime']),
    startTime: buildDateRangeQuery.bind(null, ['startTime']),
    vendorId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.vendorId=="${id}"`,
    exportConfigId: (id) => `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.exportConfigId=="${id}"`,
    integrationType: (type) => (
      `jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.integrationType==${buildIntegrationTypesCqlValue(type)}`
    ),
  },
  {
    jobId: 'name',
    exportMethod: 'jsonb.exportTypeSpecificParameters.vendorEdiOrdersExportConfig.configName',
  },
);

export const useExportEdiJobsQuery = (search, pagination, filters) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'export-edi-jobs' });

  const {
    fetchNextPage,
    isLoading,
    data = {},
    refetch,
  } = useInfiniteQuery({
    queryKey: [namespace, search],
    queryFn: async () => {
      const kyOptions = {
        searchParams: {
          limit: pagination.limit,
          offset: pagination.offset,
          query: buildJobsQuery({
            type: ORGANIZATION_INTEGRATION_EXPORT_TYPES,
            ...queryString.parse(`${search}`),
          }),
        },
      };

      const response = await ky.get('data-export-spring/jobs', kyOptions).json();

      return { ...response };
    },
    enabled: !![...Object.values(filters)].filter(Boolean).length,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const pages = data.pages || [];

  return {
    loadMore: fetchNextPage,
    isLoading,
    exportEdiJobs: pages.reduce((acc, page) => {
      if (!page.jobRecords) {
        return acc;
      }

      return acc.concat(page.jobRecords);
    }, []),
    totalCount: pages[0]?.totalRecords,
    refetch,
  };
};
